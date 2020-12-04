import React from 'react'
import PropTypes from 'prop-types'
const LoginForm = (props) => {
	return(
		<div>
			<form onSubmit={props.handleLogin}>
				<div>
					Username:
					<input
						type="text"
						value={props.username}
						id="username"
						onChange={({ target }) => props.setUsername(target.value)}
					/>
				</div>
				<div>
					Password:
					<input
						type="password"
						value={props.password}
						id="password"
						onChange={({ target }) => props.setPassword(target.value)}
					/>
				</div>
				<button type = "submit" id="login-button">Login</button>
			</form>
		</div>
	)
}

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default LoginForm