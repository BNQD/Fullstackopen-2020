import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './index.css'

import Home from './components/Home'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'

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
	
	const user = useSelector(state => state.user)
	
	//User not logged in - Show login form
	if (window.localStorage.getItem('User') === null) {
		return (
			<LoginForm  />
		)
	}
	else {
		return (
		<Router>
			<Switch>
				<Route path="/users">
					<UserInfo />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
		)
	}
}

export default App