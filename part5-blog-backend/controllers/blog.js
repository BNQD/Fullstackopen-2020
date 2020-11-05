const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
	const body = request.body
	const blog = new Blog ({
		title: body.title,
		author: body.author,
		likes: 0
	})
	
	const savedBlog = await blog.save()
	
	response.status(201).json(savedBlog)
})

blogRouter.get('/:id', async(request, response) => {
	const blog_found = await Blog.findById(request.params.id)
	response.status(200).json(blog_found)
})

blogRouter.delete('/:id', async(request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	const userid_from_token = decodedToken.id
	const blog_found = await Blog.findById(request.params.id)
	console.log(blog_found.user.toString())
	console.log(userid_from_token.toString())
	if (userid_from_token.toString() === blog_found.user.toString()){
		console.log('equal')
		const result = await Blog.findByIdAndRemove(request.params.id)
		response.status(204).json(result)
	} else {
		response.status(403).json({error: 'unable to delete'})
		
	}
	
})

blogRouter.put('/:id', async (request, response) => {
	const result = await Blog.findByIdAndUpdate(request.params.id, {'likes': request.body.likes})
	console.log(request.body.likes)
	response.status(204).json(result)
})

module.exports = blogRouter