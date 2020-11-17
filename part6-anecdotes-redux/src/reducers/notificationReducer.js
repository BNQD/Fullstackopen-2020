

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

export const changeMessage = (msg) => {
	return ({
		type: 'CHANGE_MESSAGE',
		content: msg
	})
}

export const clearMessage = () => {
	return ({
		type: 'REMOVE_MESSAGE'
	})
}

export default notificationReducer