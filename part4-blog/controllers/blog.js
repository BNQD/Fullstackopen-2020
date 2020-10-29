const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
	const result = await blog.save()
	response.status(201).json(result)
})

blogRouter.get('/:id', async(request, response) => {
	const blog_found = await Blog.findById(request.params.id)
	response.status(200).json(blog_found)
})

blogRouter.delete('/:id', async(request, response) => {
	const result = await Blog.findByIdAndRemove(request.params.id)
	response.status(204).json(result)
})

blogRouter.put('/:id', async (request, response) => {
	const result = await Blog.findByIdAndUpdate(request.params.id, {'likes': request.body.likes})
	console.log(request.body.likes)
	response.status(204).json(result)
})

module.exports = blogRouter