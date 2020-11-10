import React, { useState, useEffect } from 'react'
import './index.css'

import _ from 'lodash'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Toggleable from './components/Toggleable'

import blogService from './services/blogs'
import userService from './services/user'
import Notification from './components/Notification'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')
	const handleLogin = async (event) => {
		event.preventDefault()
		try	{
			const response = await userService.login(username, password)
			const userObject = {
				'username': response.username,
				'name': response.name,
				'token': response.token
			}
			window.localStorage.setItem(
				'User', JSON.stringify(userObject)
			)
			setUsername('')
			setPassword('')
		} catch (exeception) {
			setMessage('Error: Incorrect username or password')
		}
	}
	const fetchBlogs = async () => {
		const blogs = await blogService.getAll()
		setBlogs(_.orderBy(blogs, 'likes', 'desc'))
	}
	const handleLogout = async () => {
		window.localStorage.clear()
		setBlogs(null)
	}
	const handleFormCreation = async (blogObject) => {
		await blogService.createBlog(blogObject)
		fetchBlogs()
	}
	const handleBlogLike = async (blogObject) => {
		const updatedBlogObject = { ...blogObject, 'likes':blogObject.likes+1 }
		await blogService.blogLike(updatedBlogObject)
		fetchBlogs()
	}
	const handleBlogDelete = async (blogObject) => {
		const selected = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
		selected ? await blogService.deleteBlog(blogObject) : console.log(false)
		fetchBlogs()
	}
	useEffect(() => {
		fetchBlogs()
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
				<Toggleable buttonLabel='Create Blog'>
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
					<Blog key={blog.id} blog={blog} handleBlogLike={handleBlogLike} handleBlogDelete={handleBlogDelete}/>
				)}
				<br/>
			</div>
		)
	}
}

export default App