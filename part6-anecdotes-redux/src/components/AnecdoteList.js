import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
	const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote_anecdote = (id) => {
		dispatch(vote(id))
  }
	
	return (
		<div>
			<h3> Anecdote List </h3>
			{anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote_anecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
		</div>
	)
}

export default AnecdoteList
