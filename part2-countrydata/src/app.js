import React, { useState, useEffect } from 'react'
import axios from 'axios'



const GetCountryDetails = (props) => {
	const countryDetails = props.countryData.filter(x => x.name.includes(props.countryName))[0]
	const api_key = process.env.REACT_APP_API_KEY
	const [ countryWeather, setCountryWeather ] = useState([])
	const countryWeatherURL = `http://api.weatherstack.com/current?access_key=${api_key}&query=${countryDetails.name}`.replace(' ', '')
	
	let promise_fulfilled = false
	
	const [ promiseFulfilled, setPromiseFulfilled ] = useState(false)
	console.log(countryWeatherURL)
	useEffect (() => {
				axios
					.get(countryWeatherURL)
					.then(response => {
						setPromiseFulfilled(true)
						setCountryWeather(response.data)
					})
			}, [])
	
	
	
	return (
		<div>
			<h1> {countryDetails.name} </h1>
			<p> Capital: {countryDetails.capital} </p>
			<p> Population: {countryDetails.population} </p>
			
			<h3> Languages </h3>
			<ul>
				{countryDetails.languages.map(x => <li key={x.name}> {x.name} </li>)}
			</ul>
			<img src={countryDetails.flag} width = "100px" alt = "flag"/>
			
			<h3> Weather </h3>
			{promiseFulfilled ? <p> {console.log (countryWeather.current)}  </p> : "Not yet" }
				
			
			
			
		</div>
	)
}

const FilteredNames = (props) => {
	const filteredCountries = props.countriesData.map(x => x.name).filter(x => x.toLowerCase().includes(props.filterCountries.toLowerCase()))
	
	
	if (filteredCountries.length > 10){ 
		return 'Too many matches'
	} 
	
	else if (filteredCountries.length !== 1) {
		return ( 
			<table>
				<tbody>
					{filteredCountries.map(x=>
						<tr key={x}>
							<td>
								{x} <button onClick={() => props.onClick(x)} > Show </button>
							</td>
						</tr>)
					}
				</tbody>
			</table>
		)	
	} 
	
	else {
		return (<GetCountryDetails countryName={filteredCountries} countryData={props.countriesData}/>)
	}
	return 'Default'
}

const App = () => {
	const [ filterCountries, setFilterCountries ] = useState('Canad')
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