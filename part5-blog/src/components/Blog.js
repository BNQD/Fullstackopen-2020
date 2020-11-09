import React from 'react'
import Toggleable from './Toggleable'

const blogStyle = {
	paddingLeft: 2,
	border: 'solid',
	borderWidth: 1,
	marginBottom: 5
}

const Blog = ({ blog }) => (
	

  <div style={blogStyle}>
    {blog.title} 
		<Toggleable buttonLabel='View'>
			Author: {blog.author}
			<br/>
			Likes: {blog.likes} <button> Like </button>
			<br/>
		</Toggleable>
  </div>
)

export default Blog
