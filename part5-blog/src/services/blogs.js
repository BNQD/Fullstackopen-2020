import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blogObject) => {
	const response = await axios.post(baseUrl, blogObject)
	return response.data
}

const blogLike = async (blogObject) => {
	const response = await axios.put(baseUrl+`/${blogObject.id}`, blogObject)
	return response.data
}

const deleteBlog = async (blogObject) => {
	const response = await axios.delete(baseUrl+`/${blogObject.id}`)
	return response.data
}

export default { getAll, createBlog, blogLike, deleteBlog }