import _ from 'lodash'
import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
		case 'VOTE':
			return _.orderBy(
				state.map ((anecdote) => {
					if (anecdote.id === action.data.id){
						return {...anecdote, votes: anecdote.votes + 1}
					} else {
						return anecdote
					}
				}), ['votes'], ['desc'])
		case 'CREATE':
			return ([...state, action.data])
		case 'INIT_ANECDOTES':
			return action.data
		default:
			break
	}

  return state
}

export const vote = (anecdote) => {
	return async dispatch => {
		const updateVote = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
		dispatch({
			type: 'VOTE',
			data: anecdote
		})
	}
}

export const addAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer