import React from 'react'
import blogService from '../services/blogs'

import { useSelector, useDispatch } from 'react-redux'
import { reset, update } from '../reducers/blogFormReducer'
import { updateNotification } from '../reducers/notificationReducer'
import { blogsCreate } from '../reducers/blogReducer'

const LoginForm = () => {
	const blogFields = useSelector(store => store.blogForm)
	const dispatch = useDispatch()
	const handleFormSubmit = (event) => {
		event.preventDefault()
		handleFormCreation({
			'title': blogFields.newBlogTitle,
			'author': blogFields.newBlogAuthor,
			'likes':0
		})		
		dispatch(reset())
		dispatch(updateNotification(`${blogFields.newBlogTitle} by ${blogFields.newBlogAuthor} created!`))
	}
	
	const handleFormCreation = async (blogObject) => {
		const newBlogObject = await blogService.createBlog(blogObject)
		dispatch(blogsCreate(newBlogObject))
	}

	return(
		<>
			<form onSubmit={handleFormSubmit} id='blog-creation-form'>
				Title <input
					type='text'
					name='Title'
					id='blog-form-title'
					value={blogFields.newBlogTitle}
					onChange={({ target }) => dispatch(update(target.value, 'title'))}
				/>
				<br/>
				Author <input
					type='text'
					name='Author'
					id='blog-form-author'
					value={blogFields.newBlogAuthor}
					onChange={({ target }) => dispatch(update(target.value, 'author'))}
				/>
				<br/>
				<button type='submit' id='blog-form-button'> Create </button>
			</form>
			<hr/>
		</>
	)
}

export default LoginForm