import React from 'react'
import { useSelector } from 'react-redux'

import Logout from '../components/Logout'

const Header = () => {
	const user = useSelector(state => state.user)
	
	return (
			<div>
				<h1> Blogs </h1>
				Logged in as {user.name}
				<br/>
				<Logout/>
				<hr/>
			</div>
		)
}

export default Header