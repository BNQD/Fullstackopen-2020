require('dotenv').config()

const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

const blogRouter = require('./controllers/blog')
const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())


app.use('/api/blogs', blogRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})