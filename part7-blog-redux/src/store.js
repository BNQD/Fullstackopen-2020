import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogFormReducer from './reducers/blogFormReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers ({
	blogForm: blogFormReducer,
	notification: notificationReducer,
	blogs: blogReducer
})

const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
)


export default store