import React from 'react'

const Notification = (props) => {
	if (props.message.toLowerCase().includes('error')){
		return (
			<div className='error'> {props.message}</div>
		)
	}
	else if (props.message){
		return (
			<div className='success'> {props.message}</div>
		)
	}
	else {
		return (
			<></>
		)
	}

}

export default Notification