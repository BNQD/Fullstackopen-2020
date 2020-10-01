import React, { useState } from 'react'

import Filter from './Filter';
import Phonebook from './Phonebook'
import Numbers from './Numbers'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' , number: '647-607-6060', id: 1},
		{ name: 'Brto Hellas' , number: '647-111-6060', id: 2}
  ]) 
  const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [filterName, setFilterName] = useState('')
	
	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	
	const handleFilterChange = (event) => {
		setFilterName(event.target.value)
	}
	
	const addName = (event) => {
		const personObject = {
			name: newName,
			number: newNumber,
			id: persons.length+1
		}
		const person_names = persons.map(person => person.name)
		
		if (person_names.includes(newName)){
			alert (newName + ' is already added to phonebook')
		}
		event.preventDefault()
		setPersons(person_names.includes(newName) ? persons : persons.concat(personObject) )
	}

  return (
    <div>
			<h2> Filter Phone Numbers </h2>
			<Filter filterName={filterName} onChange={handleFilterChange} />
			
      <h2>Phonebook</h2>
			<Phonebook addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
			<h2>Numbers</h2>
			<Numbers persons={persons} filterName={filterName} />
		
    </div>
  )
}

export default App