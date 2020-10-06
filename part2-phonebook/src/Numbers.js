import React from 'react'

import personService from './services/persons'

const Numbers = (props) => {
	return (
		<div>
			<table>
				<tbody>
					{((props.persons.filter(person => person.name.toLowerCase().includes(props.filterName.toLowerCase())))).map((person) =>  
						<tr key = {person.id}>
							<td>{person.name}</td>
							<td>{person.number}</td>
							<td> <button onClick = {() => {personService.remove(person.id, person.name);props.handleDataDeleteEvent(person.id)}}> Delete </button> </td>
						</tr>)
					}
				</tbody>
			</table>
		</div>
	)
}

export default Numbers