const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
		case 'FILTER':
			return action.content
		default:
			break
	}
  return state
}

export const updateFilter = (msg) => {
	return ({
		type: 'FILTER',
		content: msg
	})
}

export default filterReducer