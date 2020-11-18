import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
	
	const submitAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(addAnecdote(content))
	}
	
	return (
		<div>
			<h3> Create New </h3>
			<form onSubmit={submitAnecdote}>
				<div><input name='anecdote'/></div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm