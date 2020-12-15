import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import userService from '../services/user'

const SpecificUserInfo = () => {
	const [ users, setUsers ] = useState ([])
	const blogs = useSelector(state => state.blogs.blogs)
	let { id } = useParams()
	
	useEffect(() => {
		const getUsers = async () => {
			const response = await userService.getUsers()
			setUsers(response)
		}
		getUsers()
	}, [])
	const currentUser = (_.filter(users, user => user.id === id))[0]
	const blogsForUser = (_.filter(blogs, blog => blog.userID === id))

	return (
		<div>
			<h2>
			{typeof(currentUser) === 'undefined' ? '' : currentUser.name }
			</h2>
			<h4> Added Blogs </h4>
			<table>
				<tbody>
					{blogsForUser.map(blog =>
						<tr key={blog.id}>
							<td >{blog.title}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default SpecificUserInfo