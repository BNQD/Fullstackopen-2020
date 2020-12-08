import blogService from '../services/blogs'
import _ from 'lodash'

const initialState = {
  blogs: []
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BLOG':
			console.log('initializing')
      return {...state, blogs: action.content}
		case 'CREATE_BLOG':
			return {...state, blogs: [...state.blogs, action.content]}
		case 'DELETE_BLOG':
			return ({...state, blogs: state.blogs.filter(x => x.id !== action.content)})
    default: return state
  }
  
}

export const blogsInit = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		const ordered_blogs = (_.orderBy(blogs, 'likes', 'desc'))
		console.log(blogs)
		dispatch({
			type: 'INIT_BLOG',
			content: ordered_blogs
		})
	}
}

export const blogsCreate = (newBlog) => {
	console.log('creating BLOGSCREATE')
	console.log(newBlog)
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
	



export default blogReducer