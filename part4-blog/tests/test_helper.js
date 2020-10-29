const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
	{
		'title':'Test Title 1',
		'author':'Test Author 1',
		'likes':5
	},
	{
		'title':'Test Title 2',
		'author':'Test Author 2',
		'likes':25
	},
]

const noTitle = [
	{
		'author':'Missing Title',
		'likes':222
	}
]

module.exports = {
	initialBlogs, noTitle
}