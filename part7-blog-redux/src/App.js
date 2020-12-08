import React, { useEffect } from 'react'
import './index.css'


import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Toggleable from './components/Toggleable'

import blogService from './services/blogs'
import Notification from './components/Notification'

import { useSelector, useDispatch } from 'react-redux'
import { blogsInit, blogsCreate, blogDelete, blogLike } from './reducers/blogReducer'
import { saveUserDetails } from './reducers/userReducer'

const App = () => {
	
	const dispatch = useDispatch()
	
	useEffect(() => {
		console.log('Initializing data...')
		dispatch(blogsInit())
		if (window.localStorage.getItem('User') !== null) {
			dispatch(saveUserDetails(JSON.parse(window.localStorage.getItem('User'))))
		}
	}, [dispatch])
	
	const message = useSelector(state => state.notification.notificationMessage)
	const blogs = useSelector(state => state.blogs.blogs)
	const user = useSelector(state => state.user)
	
	
	
	const handleLogout = async () => {
		window.localStorage.clear()
	}
	const handleFormCreation = async (blogObject) => {
		const newBlogObject = await blogService.createBlog(blogObject)
		dispatch(blogsCreate(newBlogObject))
	}
	const handleBlogLike = async (blogObject) => {
		const updatedBlogObject = { ...blogObject, 'likes':blogObject.likes+1 }
		await blogService.blogLike(updatedBlogObject)
		dispatch(blogLike(updatedBlogObject))
	}
	const handleBlogDelete = async (blogObject) => {
		const selected = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
		if (selected) {
			await blogService.deleteBlog(blogObject)
			dispatch(blogDelete(blogObject))
		}
	}
	
	//User not logged in - Show login form
	if (window.localStorage.getItem('User') === null) {
		return (
			<div>
				<h2> Log In to Application </h2>
				<Notification message={message}/>
				<LoginForm  />
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
				Logged in as {user.name}
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