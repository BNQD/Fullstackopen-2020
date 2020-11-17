import React from 'react'
import { useSelector } from 'react-redux'
import notificationReducer from '../reducers/notificationReducer'

const Notification = () => {
	const message = useSelector(state => state.notifications)
	
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
	
	console.log(message)
	
	return message ? 
		(<div style={style}>
			{message}
		</div>)
		 :
		(<></>)
}

export default Notification