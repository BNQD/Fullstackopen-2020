import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then (response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  axios.put(`${baseUrl}/${id}`, newObject)
	window.location.reload()
}

const post = (object) => {
	axios
		.post (baseUrl, object)
}

const remove = (id, name) => {
	const confirmation = window.confirm(`Delete ${name}?`)
	
	if (confirmation){
		axios
			.delete(`${baseUrl}/${id}`)
		window.location.reload()
	} 

}

export default {getAll, create, update, remove}