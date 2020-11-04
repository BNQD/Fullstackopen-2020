const mongoose = require('mongoose')
const supertest = require('supertest')
require('express-async-errors')
const blog_helper = require('./test_helper')
const user_helper = require('./user_test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const config = require('../utils/config')

beforeEach(async () => {
	await User.deleteMany({})
	
	
	console.log(user_helper.initial_users)
	user_helper.initial_users.forEach(async (user) => {
		let userObject = new User(user)
		console.log(userObject)
		console.log('sadoaisjdoaijsdoaisjdoaisdjoaisdjoaisjdoaisjd')
		await userObject.save()
	})
})
describe('dummy test', () => {
	test ('dummy login', async () => {
		const val = 1
		expect(1).toBe(1)
	})
})


test ('user can login', async () => {
	const login_info = {
		username: config.TEST_USERNAME,
		password: config.TEST_PASSWORD
	}
	
	console.log(login_info)
	
	const response = await api
		.post('/api/login/')
		.send(login_info)
	
	
	console.log(response.body)
})


afterAll(() => {
  mongoose.connection.close()
})




