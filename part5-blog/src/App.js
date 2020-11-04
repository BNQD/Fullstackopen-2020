import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import userService from './services/user'

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState({})
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	
	const [newBlogTitle, setNewBlogTitle] = useState('')
	const [newBlogAuthor, setNewBlogAuthor] = useState('')
	
	const handleLogin = async (event) => {
    event.preventDefault()
		try	{
			const response = await userService.login(username, password) 
			const userObject = {
				"username": response.username,
				"name": response.name,
				"token": response.token
			}
			window.localStorage.setItem(
				'User', JSON.stringify(userObject)
			)
			
			setUser(userObject)
			setUsername('')
			setPassword('')
		} catch (exeception) {
			
		}
		
  }
	
	const handleLogout = async (event) => {
		window.localStorage.clear()
		setUser(null)
	}
	
	const handleFormCreation = async (event) => {
		
	}
	
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if (window.localStorage.getItem('User') === null) {
		
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
			<CreateBlogForm setNewBlogTitle={setNewBlogTitle} setNewBlogAuthor={setNewBlogAuthor}/>
			Logged in as {JSON.parse(window.localStorage.getItem('User')).name}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
			<br/>
			<button onClick={handleLogout}>
				Logout
			</button>
    </div>
		)
	}
  
}

export default App