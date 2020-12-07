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

import { useSelector, useDispatch } from 'react-redux'
import { updateNotification, resetNotification } from './reducers/notificationReducer'
import { blogsInit } from './reducers/blogReducer'

const App = () => {
	
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(blogsInit())
	}, [])
	
	const message = useSelector(state => state.notification.notificationMessage)
	const blogs = useSelector(state => state.blogs.blogs)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	
	console.log(blogs)
	
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
			dispatch(resetNotification())
		} catch (exeception) {
			dispatch(updateNotification('Error: Incorrect username or password'))
		}
	}
	const handleLogout = async () => {
		window.localStorage.clear()
	}
	const handleFormCreation = async (blogObject) => {
		await blogService.createBlog(blogObject)
	}
	const handleBlogLike = async (blogObject) => {
		const updatedBlogObject = { ...blogObject, 'likes':blogObject.likes+1 }
		await blogService.blogLike(updatedBlogObject)
	}
	const handleBlogDelete = async (blogObject) => {
		const selected = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
		selected ? await blogService.deleteBlog(blogObject) : console.log(false)
	}
	if (window.localStorage.getItem('User') === null) {
		return (
			<div>
				<h2> Log In to Application </h2>
				<Notification message={message}/>
				<LoginForm handleLogin={handleLogin} username={username}
					setUsername={setUsername} password={password} setPassword={setPassword} />
			</div>
		)
	}
	else {
		return (
			<div>
				<h2> Create a new Blog </h2>
				<Notification message={message}/>
				<Toggleable buttonLabel='Create Blog'>
					<CreateBlogForm handleFormCreation={handleFormCreation} />
				</Toggleable>
				<hr/>
				Logged in as {JSON.parse(window.localStorage.getItem('User')).name}
				<br/>
				<button onClick={handleLogout} id='logoutbutton'>
					Logout
				</button>
				<hr/>
				<h2> Blogs </h2>
				<div id='blog-list'>
					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog} handleBlogLike={handleBlogLike} handleBlogDelete={handleBlogDelete}/>
					)}
				</div>
				<br/>
			</div>
		)
	}
}

export default App