import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import userService from '../services/user'

import Notification from './Notification'

import { updateNotification, resetNotification } from '../reducers/notificationReducer'
import { saveUserDetails } from '../reducers/userReducer'
import { blogsInit } from '../reducers/blogReducer'

const LoginForm = (props) => {	
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	
	const handleLogin = async (event) => {
		event.preventDefault()
		try	{
			const response = await userService.login(username, password)
			const userObject = {
				'username': response.username,
				'name': response.name,
				'token': response.token
			}
			window.localStorage.setItem(
				'User', JSON.stringify(userObject)
			)
			setUsername('')
			setPassword('')
			dispatch(resetNotification())
			dispatch(saveUserDetails(userObject))
			dispatch(blogsInit())
		} catch (exeception) {
			dispatch(updateNotification('Error: Incorrect username or password'))
		}
	}
	
	return(
		<div>
			<h2> Log In to Application </h2>
			<Notification />
			<div>
				<form onSubmit={handleLogin}>
					<div>
						Username:
						<input
							type="text"
							value={username}
							id="username"
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						Password:
						<input
							type="password"
							value={password}
							id="password"
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button type = "submit" id="login-button">Login</button>
				</form>
			</div>
		</div>
	)
}

export default LoginForm