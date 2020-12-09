import React from 'react'
import Toggleable from './Toggleable'

import blogService from '../services/blogs'

import { useDispatch } from 'react-redux'
import { blogDelete, blogLike } from '../reducers/blogReducer'

const blogStyle = {
	paddingLeft: 2,
	paddingBottom: 2,
	border: 'solid',
	borderWidth: 1,
	marginBottom: 5
}

const Blog = ({ blog }) => {
	const dispatch = useDispatch()
	
	const handleBlogLike = async (blogObject) => {
			const updatedBlogObject = { ...blogObject, 'likes':blogObject.likes+1 }
			await blogService.blogLike(updatedBlogObject)
			dispatch(blogLike(updatedBlogObject))
		}
	const handleBlogDelete = async (blogObject) => {
		const selected = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
		if (selected) {
			await blogService.deleteBlog(blogObject)
			dispatch(blogDelete(blogObject))
		}
	}
	return (
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
}
export default Blog
