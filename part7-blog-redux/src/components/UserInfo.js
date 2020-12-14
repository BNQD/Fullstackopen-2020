import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import userService from '../services/user'

const UserInfo = () => {
	const [ users, setUsers ] = useState([])
	const blogs = useSelector(state => state.blogs.blogs)
	
	useEffect(() => {
		const getUsers = async () => {
			const users = await userService.getUsers()
			setUsers(users)
			return users
		}
		getUsers()
	}, [])
	const count_blog_author = (_.countBy(blogs, 'author'))
	const count_blog_author_array = (Object.keys(count_blog_author).map((key) => [key, count_blog_author[key]]))
	
	
	
	const getUserIDFromUsername = (name) => {
		const matchedUser = (_.filter(users, (user) => user.name===name))[0]
		if (typeof (matchedUser) !== 'undefined'){
			return (matchedUser.id)
		}
	}

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th> Author </th>
						<th> Blogs Created </th>
					</tr>
				</thead>
				<tbody>
					{count_blog_author_array.map((author) => 
						<tr key={author[0]}> 
							<td> 
								<Link to={'users/'+getUserIDFromUsername(author[0])}> {author[0]} </Link>
							</td>
							<td> {author[1]} </td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default UserInfo