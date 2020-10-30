const mongoose = require('mongoose')
const supertest = require('supertest')
require('express-async-errors')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	helper.initialBlogs.forEach(async (blog) => {
		let blogObject = await new Blog(blog)
		await blogObject.save()
	})
})

describe (('blog validation'), () => {
	test ('blogs contain id field', async () => {
		const response = await api.get('/api/blogs/')
		expect(response.body[0].id).toBeDefined()
	})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
	})
	
	test('all blogs are returned', async () => {
		let response = await api.get('/api/blogs');
		//await expect((async () => {api.get('/api/blogs')}).toHaveLength(helper.initialBlogs.length)
		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})
})


test('async a valid blog can be added', async () => {
	const newBlog = {
		title: 'async/await simplifies making async calls',
		author: 'Testing Again'
	}
	
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
		
	const response = await api.get('/api/blogs')
	
	const contents = response.body.map(r => r.title)
	
	expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
	expect(contents).toContain(
		'async/await simplifies making async calls'
	)
})

test('blog can be deleted', async () => {
	const response = await api.get('/api/blogs/')
	const blogsStart = response.body
	const blogToDelete = blogsStart[0]
	
	await api
		.delete(`api/blogs/${blogToDelete.id}`)
	
	const blogsAtEnd = await api.get('/api/blogs')
	
	expect (blogsAtEnd).toHaveLength(
		helper.initialBlogs.length -1
	)
	
	const blogs = blogsAtEnd(r => r.title)
	
	expect(blogs).not.toContain(blogToDelete.title)
	
})


test ('blog without title can not be added', async () => {
	await api.
		post('/api/blogs')
		.send(helper.noTitle)
		.expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})