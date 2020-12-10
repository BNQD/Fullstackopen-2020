import React from 'react'
import { useSelector } from 'react-redux'

import CreateBlogForm from '../components/CreateBlogForm'
import Toggleable from '../components/Toggleable'
import Logout from '../components/Logout'
import Notification from '../components/Notification'
import Blog from '../components/Blog'

const Home = () => {
	const blogs = useSelector(state => state.blogs.blogs)
	const user = useSelector(state => state.user)
	
	return (
			<div>
				<h2> Create a new Blog </h2>
				<Notification />
				<Toggleable buttonLabel='Create Blog'>
					<CreateBlogForm />
				</Toggleable>
				<h2> Blog List </h2>
				<div id='blog-list'>
					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog} />
					)}
				</div>
				<br/>
			</div>
		)
}

export default Home