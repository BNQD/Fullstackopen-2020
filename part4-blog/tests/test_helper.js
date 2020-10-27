const Blog = require('../models/blog')

const initialBlogs = [
	{
		'title':'Test Title 1',
		'author':'Test Author 1',
		'likes':5,
		'id':'5f92ea5dd276d33d30553c75'
	},
	{
		'title':'Test Title 2',
		'author':'Test Author 2',
		'likes':25,
		'id':'5f92ea5dd276d33d30883c75'
	},
]

const noTitle = [
	{
		'author':'Missing Title',
		'likes':222,
		'id':'3werwerwerwer'
	}
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs, blogsInDb, noTitle
}