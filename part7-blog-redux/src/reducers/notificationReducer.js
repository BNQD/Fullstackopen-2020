const initialState = {
  notificationMessage: ''
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION_UPDATE':
      return {...initialState, notificationMessage: action.content }
		case 'NOTIFICATION_RESET':
			return initialState
    default: return state
  }
  
}

export const updateNotification = (content) => {
	return ({
		type: 'NOTIFICATION_UPDATE',
		content
	})
}

export const resetNotification = () => {
	return ({
		type: 'NOTIFICATION_RESET'
	})
}

export default notificationReducer