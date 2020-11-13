import React, { useState } from 'react'

const LoginForm = ({ handleFormCreation, setMessage }) => {
	const [newBlogTitle, setNewBlogTitle] = useState('')
	const [newBlogAuthor, setNewBlogAuthor] = useState('')

	const handleFormSubmit = (event) => {
		event.preventDefault()
		handleFormCreation({
			'title': newBlogTitle,
			'author': newBlogAuthor,
			'likes':0
		})
		setNewBlogTitle('')
		setNewBlogAuthor('')

		setMessage(`${newBlogTitle} by ${newBlogAuthor} created!`)
	}

	return(
		<>
			<form onSubmit={handleFormSubmit} id='blog-creation-form'>
				Title <input
					type='text'
					name='Title'
					id='blog-form-title'
					value={newBlogTitle}
					onChange={({ target }) => setNewBlogTitle(target.value)}
				/>
				<br/>
				Author <input
					type='text'
					name='Author'
					id='blog-form-author'
					value={newBlogAuthor}
					onChange={({ target }) => setNewBlogAuthor(target.value)}
				/>
				<br/>
				<button type='submit' id='blog-form-button'> Create </button>
			</form>
			<hr/>
		</>
	)
}

export default LoginForm