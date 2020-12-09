import React from 'react'

import { useDispatch } from 'react-redux'
import { clearUserDetails } from '../reducers/userReducer'

const Logout = () => {
	const dispatch = useDispatch()
	
	const handleLogout = async () => {
		window.localStorage.clear()
		dispatch(clearUserDetails())
	}
	
	return (
		<div>
			<button onClick={handleLogout} id='logoutbutton'>
					Logout
				</button>
		</div>
	)
}

export default Logout