import blogService from '../services/blogs'
import _ from 'lodash'

const initialState = {
  blogs: []
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BLOG':
      return {...state, blogs: action.content}
		case 'CREATE_BLOG':
			return {...state, blogs: [...state.blogs, action.content]}
		case 'DELETE_BLOG':
			return ({...state, blogs: state.blogs.filter(x => x.id !== action.content)})
		case 'LIKE_BLOG':
			return({...state, blogs: state.blogs.map(x => x.id === action.content.id ? action.content : x)})
    default: return state
  }
  
}

export const blogsInit = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		const ordered_blogs = (_.orderBy(blogs, 'likes', 'desc'))
		dispatch({
			type: 'INIT_BLOG',
			content: ordered_blogs
		})
	}
}

export const blogsCreate = (newBlog) => {
	return ({
		type: 'CREATE_BLOG',
		content: newBlog
	})
}	

export const blogDelete = (newBlog) => {
	return({
		type: 'DELETE_BLOG',
		content: newBlog.id
	})
}
	
	
export const blogLike = (updatedBlog) => {
	return ({
		type: 'LIKE_BLOG',
		content: updatedBlog
	})
}



export default blogReducer