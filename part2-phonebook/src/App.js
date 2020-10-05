import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './Filter';
import Phonebook from './Phonebook'
import Numbers from './Numbers'

import personService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
	
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
	
	//Fetch Persons Data
	useEffect(() => {
		personService
			.getAll()
			.then(response => {
				setPersons(response)
			})
	}, [])
	
	const addName = (event) => {
		//Create persons Object with new Name + Phone num
		const personObject = {
			name: newName,
			number: newNumber,
			id: persons.reduce (
				(max, person) => (person.id > max ? person.id : max),
				persons[0].id
			) + 1
		}
		
		const person_names = persons.map(person => person.name)
		
		if (person_names.includes(newName)){
			const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
			if (confirmation) {
				const current_id = (persons.find(person => person.name === newName)).id
				personService.update(current_id, personObject)
			}
		} else {
			personService
				.create(personObject)
		}
		event.preventDefault()
		
		setPersons(person_names.includes(newName) ? persons : persons.concat(personObject))
	}

	

  return (
    <div>
			<h2> Filter Phone Numbers </h2>
			<Filter filterName={filterName} onChange={handleFilterChange} />
			
      <h2>Phonebook</h2>
			<Phonebook addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
			<h2>Numbers</h2>
			<Numbers persons={persons} filterName={filterName}/>
    </div>
  )
}

export default App