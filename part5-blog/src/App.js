import React, { useState, useEffect } from 'react'
import './index.css'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import userService from './services/user'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState({})
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	
	const [message, setMessage] = useState('')
	
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
			setMessage('Error: Incorrect username or password')
		}
		
  }
	
	const handleLogout = async (event) => {
		window.localStorage.clear()
		setUser(null)
	}
	
	const handleFormCreation = async (event) => {
		event.preventDefault()
		
		if(!(window.localStorage.getItem('User') === null)){
			const blogObject = {
				"title": newBlogTitle,
				"author": newBlogAuthor
			}
			
			const response = await blogService.createBlog(blogObject)
			
			console.log(response)		
		}		
		
		const blogs = await blogService.getAll()
		setBlogs(blogs)
		setMessage('Testtest')
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
			<CreateBlogForm handleFormCreation={handleFormCreation} setNewBlogTitle={setNewBlogTitle} 
				setNewBlogAuthor={setNewBlogAuthor}/>
			Logged in as {JSON.parse(window.localStorage.getItem('User')).name}
			<hr/>
			<h2> Blogs </h2>
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