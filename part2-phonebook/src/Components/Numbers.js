import React from 'react'

const Numbers = (props) => {
	return (
		<div>
			<table>
				<tbody>
					{((props.persons.filter(person => person.name.toLowerCase().includes(props.filterName.toLowerCase())))).map((person) =>  
						<tr key = {person.id}>
							<td>{person.name}</td>
							<td>{person.number}</td>
						</tr>)
					}
				</tbody>
			</table>
		</div>
	)
}

export default Numbers