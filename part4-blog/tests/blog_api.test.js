const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	
	let blogObject = new Blog(helper.initialBlogs[0])
	await blogObject.save()
	
	blogObject = new Blog(helper.initialBlogs[1])
	await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned notes', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'Test Title 1'
  )
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
	const blogsStart = helper.initialBlogs
	const blogToDelete = blogsStart[0]
	
	console.log(blogsStart)
	console.log(blogToDelete)
	
	console.log(blogToDelete.id)
	
	await api
		.delete(`api/blogs/${blogToDelete.id}`)
	
	const blogsAtEnd = await helper.blogsInDb()
	
	expect (blogsAtEnd).toHaveLength(
		helper.initialBlogs.length -1
	)
	
	const blogs = blogsAtEnd(r => r.title)
	
	expect(blogs).not.toContain(blogToDelete.title)
	
})


/*
test ('blog without title can not be added', async () => {
	try {
		await api.
			post('/api/blogs')
			.send(helper.noTitle)
	}	catch (exception){
		console.log(exception)
	}		
	
	
})
*/















afterAll(() => {
  mongoose.connection.close()
})