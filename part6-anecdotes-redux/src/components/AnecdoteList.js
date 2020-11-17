import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { changeMessage, clearMessage } from '../reducers/notificationReducer'


const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote_anecdote = (anecdote) => {
		dispatch(vote(anecdote.id))
		dispatch(changeMessage(`You voted ${anecdote.content}`))
		setTimeout(() => {
			dispatch(clearMessage())
		}, 5000)
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
