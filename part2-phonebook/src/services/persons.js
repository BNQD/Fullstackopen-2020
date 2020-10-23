import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl).then (response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id, name, handleMessageChange) => {
	const confirmation = window.confirm(`Delete ${name}?`)
	
	if (confirmation){
		axios
			.delete(`${baseUrl}/${id}`)
			.then(() => {
				console.log(`${name} deleted`)
				handleMessageChange(`${name} removed successfully`)
			})
			.catch(error => {
				handleMessageChange(`Error: ${name} has already been removed`)
			})
	} 
	
	return ''
	
	

}

export default {getAll, create, update, remove}