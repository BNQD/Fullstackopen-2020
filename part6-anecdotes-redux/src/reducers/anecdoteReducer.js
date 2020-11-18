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

export const vote = (id) => {
	return async (dispatch) => {
		await anecdoteService.voteAnecdote(id)
		dispatch({
			type: 'VOTE',
			data: { id }
		})
	}
}

export const addAnecdote = (anecdote) => {
	console.log('adding')
	return async (dispatch) => {
		await anecdoteService.createAnecdote(anecdote)
		dispatch({
			type: 'CREATE',
			data: {
				content: anecdote,
				votes: 0
			}
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