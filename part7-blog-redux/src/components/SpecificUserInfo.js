import React from 'react'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const SpecificUserInfo = () => {
	const blogs = useSelector(state => state.blogs.blogs)
	let { id } = useParams()
	console.log(id)
	return (
		<div>
			Test
		</div>
	)
}

export default SpecificUserInfo