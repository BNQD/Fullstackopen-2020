

const initialState = {
  name: '',
	username: '',
	userID: '',
	token: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
			return {...initialState, 
				name: action.content.name, 
				token: action.content.token,
				username: action.content.username,
				userID: action.content.userID}
		case 'CLEAR_USER_DETAILS':
			return {...initialState,
				name: '',
				token: '',
				username: ''}
    default: return state
  }
}

export const saveUserDetails = (userDetails) => {
	return ({
			type: 'USER_LOGIN',
			content: userDetails
	})
}

export const clearUserDetails = () => {
	return ({
		type: 'CLEAR_USER_DETAILS'
	})
}


export default userReducer