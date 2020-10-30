const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
	const body = request.body
	const user = await User.findById(request.body.userId)
	
	const blog = new Blog ({
		title: body.title,
		author: body.author,
		likes: 0,
		user: user._id
	})
	
	const savedBlog = await blog.save()
	
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	
	response.status(201).json(savedBlog)
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