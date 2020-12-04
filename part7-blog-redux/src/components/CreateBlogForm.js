import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset, update } from '../reducers/blogFormReducer'


const LoginForm = ({ handleFormCreation, setMessage }) => {

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
		setMessage(`${blogFields.newBlogTitle} by ${blogFields.newBlogAuthor} created!`)
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