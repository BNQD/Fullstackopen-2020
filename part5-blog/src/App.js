import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import blogService from './services/blogs'
import userService from './services/user'

let token = null

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('Test')
	const [password, setPassword] = useState('Test')
	
	const handleLogin = async (event) => {
    event.preventDefault()
		
		const response = await userService.login(username, password) 
    console.log('logging in with', username, password)
		setUser({
			"username": response.username,
			"name": response.name,
			"token": response.token
			})
		token = response.token
  }
	
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if (user === null) {
    return (	
      <div>
				<LoginForm handleLogin={handleLogin} username={username} 
					setUsername={setUsername} password={password} setPassword={setPassword}/>
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