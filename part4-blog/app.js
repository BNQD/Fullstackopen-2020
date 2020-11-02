require('dotenv').config()

const http = require('http')
const express = require('express')
require('express-async-errors')
const app = express()
const pretty = require('express-prettify')
app.use(pretty({ query: 'pretty'}))

const cors = require('cors')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const Blog = require('./models/blog')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
