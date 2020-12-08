

const initialState = {
  name: '',
	username: '',
	token: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
			return {...initialState, 
				name: action.content.name, 
				token: action.content.token,
				username: action.content.username}
    default: return state
  }
}

export const saveUserDetails = (userDetails) => {
	console.log('saving user details')
	console.log(userDetails)
	return ({
			type: 'USER_LOGIN',
			content: userDetails
	})
}


export default userReducer