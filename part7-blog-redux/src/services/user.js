const axios = require('axios')
const baseUrl = 'http://localhost:3001/api/users'

const login = async (username, password) => {
	const userDetails = {
		'username':username,
		'password':password
	}

	const response = await axios
		.post(baseUrl+'/login', userDetails)

	return response.data
}

const getUsers = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

export default { login, getUsers }