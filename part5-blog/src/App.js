import React, { useState, useEffect } from 'react'
import './index.css'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Toggleable from './components/Toggleable'

import blogService from './services/blogs'
import userService from './services/user'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState({})
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	
	const [message, setMessage] = useState('')
	
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
			setMessage('Error: Incorrect username or password')
		}
		
  }
	
	const handleLogout = async (event) => {
		window.localStorage.clear()
		setUser(null)
	}
	
	const handleFormCreation = async (blogObject) => {
		const response = await blogService.createBlog(blogObject)
		const blogs = await blogService.getAll()
		setBlogs(blogs)
	}
	
	const handleBlogLike = async (blogObject) => {
		const updatedBlogObject = {...blogObject, 'likes':blogObject.likes+1}
		const response = await blogService.blogLike(updatedBlogObject)
		const blogs = await blogService.getAll()
		setBlogs(blogs)
	}
	
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if (window.localStorage.getItem('User') === null) {
		
    return (	
      <div>
				<h2> Log In to Application </h2>
				<Notification message={message}/>
				<LoginForm handleLogin={handleLogin} username={username} 
					setUsername={setUsername} password={password} setPassword={setPassword} setMessage={setMessage}/>
      </div>
    )
	}
	else {
		return (
    <div>
			<h2> Create Blog </h2>
			<Notification message={message}/>
			<Toggleable buttonLabel='Create Blog' closeLabel='Cancel'>
				<CreateBlogForm handleFormCreation={handleFormCreation} setMessage={setMessage}/>
			</Toggleable>
			<hr/>
			Logged in as {JSON.parse(window.localStorage.getItem('User')).name}
			<br/>
			<button onClick={handleLogout}>
				Logout
			</button>
			<hr/>
			<h2> Blogs </h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleBlogLike={handleBlogLike}/>
      )}
			<br/>
			
    </div>
		)
	}
  
}

export default App