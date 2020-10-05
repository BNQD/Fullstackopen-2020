import React from 'react'

const Filter = (props) => {
	return (
		<p> Filter Name: <input 
				value = {props.filterName} 
				onChange = {props.onChange}
			/> 
		</p>
	)
}

export default Filter