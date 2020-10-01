import React from 'react'

const Phonebook = (props) => {
	return (
		<form onSubmit={props.addName}>
			<div>
				Name: <input 
					value = {props.newName} 
					onChange={props.handleNameChange} />
			</div>
			<div>
				Phone Number: <input 
					value = {props.newNumber}
					onChange = {props.handleNumberChange}
				/>
			</div>
			<br />
			<div>
				<button type="submit">
					Add
				</button>
			</div>
		</form>
	)
}

export default Phonebook