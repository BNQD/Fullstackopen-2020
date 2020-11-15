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
			<p className='blog-author'>
				Author: {blog.author}
			</p>
			<p className='blog-likes'>
				Likes: {blog.likes}
			</p>
			<button onClick={() => handleBlogLike(blog)} className='blog-like-button'>
				Like
			</button>
			<button onClick={() => handleBlogDelete(blog)} className='blog-delete-button'> Delete </button>
		</Toggleable>
	</div>
)
export default Blog
