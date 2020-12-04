import blogService from '../services/blogs'
import _ from 'lodash'

const initialState = {
  blogs: []
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT':
      return action.content
		case 'RESET':
			return initialState
    default: return state
  }
  
}

export const init = async () => {
	const blogs = await blogService.getAll()
	const ordered_blogs = (_.orderBy(blogs, 'likes', 'desc'))
	return ({
		type: 'INIT',
		content: ordered_blogs
	})
}



export default blogReducer