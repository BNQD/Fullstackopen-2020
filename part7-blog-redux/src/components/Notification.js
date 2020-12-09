import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
	const message = useSelector(state => state.notification.notificationMessage)
	
	if (message.toLowerCase().includes('error')){
		return (
			<div className='error'> {message}</div>
		)
	}
	else if (message){
		return (
			<div className='success'> {message}</div>
		)
	}
	else {
		return (
			<></>
		)
	}

}

export default Notification