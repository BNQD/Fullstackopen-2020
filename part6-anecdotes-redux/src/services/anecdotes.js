import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (anecdote) => {
	const response = await axios.post(baseUrl, {
		'content': anecdote,
		'votes': 0
		})
	return response.data
}

const voteAnecdote = async (id) => {
	const anecdote = (await axios.get(baseUrl+`/${id}`)).data
	const response = await axios.put(baseUrl+`/${id}`, {
		'content': anecdote.content,
		'votes': anecdote.votes+1
	})
	return response.data
}

export default { getAll, createAnecdote, voteAnecdote }