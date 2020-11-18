import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { changeMessage } from '../reducers/notificationReducer'


const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote_anecdote = (anecdote) => {
		dispatch(vote(anecdote))
		dispatch(changeMessage(`You voted ${anecdote.content}`, 3))
  }
	
	const checkFiltered = (anecdote) => {
		if (anecdote.content.includes(filter) || !filter){
			return (
				<div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote_anecdote(anecdote)}>vote</button>
          </div>
        </div>
			)
		}
	}
	
	return (
		<div>
			<h3> Anecdote List </h3>
			{anecdotes.map(anecdote => checkFiltered(anecdote))}
		</div>
	)
}

export default AnecdoteList
