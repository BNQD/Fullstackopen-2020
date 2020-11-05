const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const config = require('./utils/config')

const express = require('express')
const cors = require('cors')
const app = express()
const middleware = require('./utils/middleware')
const userRouter = require('./controllers/user')
const blogRouter = require('./controllers/blog')

app.use(express.json())
app.use(cors())
app.use(middleware.requestLogger)

app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

app.get('/', (request, response) => {
	response.status(200).send({ test: 'test msg'})
})



const PORT = config.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})