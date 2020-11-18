const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
		case 'CHANGE_MESSAGE':
			return action.content
		case 'REMOVE_MESSAGE':
			return ''
		default:
			break
	}
  return state
}

export const changeMessage = (msg, secondsToClear) => {
	const clearMessage = () => {
		return ({
			type: 'REMOVE_MESSAGE'
		})
	}
	
	return async (dispatch)=> {
		dispatch({
			type: 'CHANGE_MESSAGE',
			content: msg
		})
		setTimeout(() => {
			dispatch(clearMessage())
		}, secondsToClear * 1000)
		
	}		
}

export default notificationReducer