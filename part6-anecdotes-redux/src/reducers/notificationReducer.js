const initialState = ''
let previous_notification_id = 0

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
		if (previous_notification_id != '0'){
			clearTimeout(previous_notification_id)
		}
		previous_notification_id = setTimeout(() => {
			dispatch(clearMessage())
		}, secondsToClear * 1000)
		
		
	}		
}

export default notificationReducer