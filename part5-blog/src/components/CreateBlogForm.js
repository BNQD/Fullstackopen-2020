import React from 'react'

const LoginForm = (props) => {
	return(
		<div>
			<h2> Create Blog </h2>
			<form onSubmit={props.handleFormCreation}>
				Title <input 
					type='text' 
					name='Title'
					onChange={({ target }) => props.setNewBlogTitle(target.value)}
				/>
				<br/>
				Author <input 
					type='text' 
					name='Author'
					onChange={({ target }) => props.setNewBlogAuthor(target.value)}
				/>
				<br/>
				<button type='submit'> Create </button>
			</form>
			<hr/>
		</div>
	)
}

export default LoginForm 