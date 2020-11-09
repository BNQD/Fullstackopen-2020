import React, { useState } from 'react'

const LoginForm = ({handleFormCreation, setMessage}) => {
	const [newBlogTitle, setNewBlogTitle] = useState('')
	const [newBlogAuthor, setNewBlogAuthor] = useState('')
	
	const handleFormSubmit = (event) => {
		event.preventDefault()
		handleFormCreation({
				"title": newBlogTitle,
				"author": newBlogAuthor,
				"likes":0
		})
		setNewBlogTitle('')
		setNewBlogAuthor('')
		
		setMessage(`${newBlogTitle} by ${newBlogAuthor} created!`)
	}
	
	return(
		<div>
			<form onSubmit={handleFormSubmit}>
				Title <input 
					type='text' 
					name='Title'
					value={newBlogTitle}
					onChange={({ target }) => setNewBlogTitle(target.value)}
				/>
				<br/>
				Author <input 
					type='text' 
					name='Author'
					value={newBlogAuthor}
					onChange={({ target }) => setNewBlogAuthor(target.value)}
				/>
				<br/>
				<button type='submit'> Create </button>
			</form>
			<hr/>
		</div>
	)
}

export default LoginForm 