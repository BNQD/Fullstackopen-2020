import blogService from '../services/blogs'
import _ from 'lodash'

const initialState = {
  blogs: []
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BLOGS_INIT':
			console.log('initializing')
      return {...state, blogs: action.content}
		case 'RESET':
			return initialState
    default: return state
  }
  
}

export const blogsInit = () => {
	console.log('calling init')
	
	return async dispatch => {
		const blogs = await blogService.getAll()
		const ordered_blogs = (_.orderBy(blogs, 'likes', 'desc'))
		console.log(blogs)
		dispatch({
			type: 'BLOGS_INIT',
			content: ordered_blogs
		})
	}
}
	
	



export default blogReducer