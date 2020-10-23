import React, { useState, useEffect } from 'react'

import Filter from './Filter'
import Numbers from './Numbers'
import Phonebook from './Phonebook'
import Notification from './Notification'

import personService from './services/persons'

import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
	
  const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [filterName, setFilterName] = useState('')
	
	const [ message, setMessage] = useState ('')
	
	let newPersons = [...persons]
	let newMessage = ''
	
	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	
	const handleFilterChange = (event) => {
		setFilterName(event.target.value)
	}
	
	const handleDataDeleteEvent = (id) => {
		const delete_id = newPersons.findIndex(person => person.id === id)
		newPersons.splice(delete_id, 1)
		setPersons(newPersons)
	}
	
	const handleMessageChange = (message) => {
		setMessage(message)
	}
	
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
				const current_index = (persons.findIndex(person => person.name === newName))
				
				personService
				    .update(current_id, personObject)
				    .then(() => {
				        setMessage(`Changed ${newName}'s Number`)
				        newPersons[current_index].number=newNumber
				        setPersons(newPersons)
								debugger
				     })
				    .catch (error => {
								console.log('update error')
				        setMessage(`Error ${error.response.data}`)
				        setPersons(newPersons)
				    })
			}
		} else {
			personService
				.create(personObject)
				.then(() => {
				    setMessage(`Added ${newName}`)
				    setPersons(newPersons.concat(personObject))
				})
				.catch(error => {
				    setPersons(newPersons)
				    setMessage(`Error ${error.response.data}`)
				})

		}
		event.preventDefault()

		setPersons(newPersons)
	}

	useEffect(() => {
		personService
			.getAll()
			.then(response => {
				setPersons(response)
			})
	}, [])

  return (
    <div>
			<Notification message={message} />
			<h2> Filter Phone Numbers </h2>
			<Filter filterName={filterName} onChange={handleFilterChange} />
			
      <h2>Phonebook</h2>
			<Phonebook addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
			<h2>Numbers</h2>
			<Numbers persons={persons} filterName={filterName} handleDataDeleteEvent = {handleDataDeleteEvent} handleMessageChange = {handleMessageChange}/>
    </div>
  )
}

export default App