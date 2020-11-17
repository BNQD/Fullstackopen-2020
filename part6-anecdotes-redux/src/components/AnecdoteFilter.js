import React from 'react'
import { useDispatch } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
	const dispatch = useDispatch()
	
	const handleFilterChange = (event) => {
		dispatch(updateFilter(event.target.value))
	}
	
	return (
		<div id='anecdote-filter'>
			<h3> Filter </h3>
			<input type='text' name='anecdote-filter' onChange={handleFilterChange}></input>
		</div>
	)
}

export default AnecdoteFilter