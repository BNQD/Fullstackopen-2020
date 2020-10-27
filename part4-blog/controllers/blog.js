const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogRouter.get('/:id', (request, response) => {
	Blog.findById(request.params.id).then(blogs => {
		response.json(blogs)
	})
})

blogRouter.delete(`/:id`, (request, response) => {
	Blog
		.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).json(result)
		})
})

module.exports = blogRouter