const initialState = {
  newBlogTitle: '',
  newBlogAuthor: ''
}

const blogFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE':
      if (action.field === 'title'){
				return {...state, newBlogTitle: action.content}
			} else if (action.field === 'author'){
				return {...state, newBlogAuthor: action.content}
			}
			break
		case 'RESET':
			return initialState
    default: return state
  }
  
}

export const update = (content, field) => {
	return ({
		type: 'UPDATE',
		field,
		content
	})
}

export const reset = () => {
	return ({
		type: 'RESET'
	})
}

export default blogFormReducer