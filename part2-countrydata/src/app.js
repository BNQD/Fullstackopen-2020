import React, { useState, useEffect } from 'react'
import FilteredNames from './FilteredNames'
import axios from 'axios'


const App = () => {
	const [ filterCountries, setFilterCountries ] = useState('')
	const [ countriesData, setCountriesData ] = useState([])
	
	const handleFilterChange = (event) => {
		setFilterCountries(event.target.value)
	}
	
	useEffect (() => {
				axios
					.get('https://restcountries.eu/rest/v2/all')
					.then(response => setCountriesData(response.data))
			}, [])

	const countryNames = countriesData.map(country => country.name)

	return (
		<div>
			<p> 
				Find Countries &nbsp;
				<input value={filterCountries} onChange={handleFilterChange} />
			</p>
			<FilteredNames countriesData = {countriesData} filterCountries = {filterCountries} onClick = {setFilterCountries} />
		</div>
	)
}

export default App