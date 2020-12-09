import React, { useEffect } from 'react'
import './index.css'

import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import { useDispatch } from 'react-redux'
import { blogsInit } from './reducers/blogReducer'
import { saveUserDetails } from './reducers/userReducer'

const App = () => {
	
	const dispatch = useDispatch()
	
	useEffect(() => {
		if (window.localStorage.getItem('User') !== null) {
			dispatch(blogsInit())
			dispatch(saveUserDetails(JSON.parse(window.localStorage.getItem('User'))))
		}
	}, [dispatch])
	
	
	//User not logged in - Show login form
	if (window.localStorage.getItem('User') === null) {
		return (
			<div>
				<h2> Log In to Application </h2>
				<Notification />
				<LoginForm  />
			</div>
		)
	}
	else {
		return (
			<Home />
		)
	}
}

export default App