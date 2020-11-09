import React from 'react'
import Toggleable from './Toggleable'

const blogStyle = {
	paddingLeft: 2,
	paddingBottom: 2,
	border: 'solid',
	borderWidth: 1,
	marginBottom: 5
}

const Blog = ({ blog, handleBlogLike, handleBlogDelete }) => (
	

  <div style={blogStyle}>
    {blog.title} 
		<Toggleable buttonLabel='View'>
			Author: {blog.author}
			<br/>
			Likes: {blog.likes} 
			<button onClick={() => handleBlogLike(blog)}> 
				Like 
			</button>
			<br/>
			<button onClick={() => handleBlogDelete(blog)}> Delete </button>
			<br/>
		</Toggleable>
  </div>
)

export default Blog
