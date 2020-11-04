import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const axios = require('axios')

let token = null

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('Test')
	const [password, setPassword] = useState('Test')
	
	const handleLogin = async (event) => {
    event.preventDefault()
		const userDetails = {
			'username':username,
			'password':password
		}
		const response = await axios
			.post('http://localhost:3001/api/users/login', userDetails)
		
		const response_data = response.data
    console.log('logging in with', username, password)
		setUser({
			"username": response_data.username,
			"name": response_data.name,
			"token": response_data.token
			})
		token = response_data.token
  }
	
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
						Username:
						<input
							type="text"
							value={username}
							name="Username"
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						Password:
						<input
							type="password"
							value={password}
							name="Password"
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button type = "submit">Login</button>
        </form>
      </div>
    )
	}
	else {
		return (
    <div>
      <h2>blogs</h2>
			Logged in as {username}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
		)
	}
  
}

export default App