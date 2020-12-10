import React from 'react'
import _ from 'lodash'
import { useSelector } from 'react-redux'

const UserInfo = () => {
	const blogs = useSelector(state => state.blogs.blogs)
	const count_blog_author = (_.countBy(blogs, 'author'))
	const count_blog_author_array = (Object.keys(count_blog_author).map((key) => [key, count_blog_author[key]]))
	return (
		<div>
			<table>
				<tr>
					<th> Author </th>
					<th> Blogs Created </th>
				</tr>
				{count_blog_author_array.map((author) => 
					<tr> 
						<td> {author[0]} </td>
						<td> {author[1]} </td>
					</tr>
				)}
			</table>
		</div>
	)
}

export default UserInfo