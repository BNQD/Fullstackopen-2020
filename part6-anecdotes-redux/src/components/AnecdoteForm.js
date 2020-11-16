import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
	
	const create_blog = (event) => {
		event.preventDefault()
		dispatch(addAnecdote(event.target.anecdote.value))
	}
	
	return (
		<div>
			<h3> Create New </h3>
			<form onSubmit={create_blog}>
				<div><input name='anecdote'/></div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm