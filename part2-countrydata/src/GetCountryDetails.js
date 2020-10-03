import React, { useState, useEffect } from 'react'
import axios from 'axios'

const GetCountryDetails = (props) => {
	const [ countryWeather, setCountryWeather ] = useState('')
	const countryDetails = props.countryData.filter(x => x.name.includes(props.countryName))[0]
	
	useEffect (() => {
		const api_key = process.env.REACT_APP_API_KEY
			axios
				.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryDetails.name}`.replace(' ', ''))
				.then(response => {
					setCountryWeather([
						response.data.current.temperature, 
						response.data.current.weather_icons,
						response.data.current.wind_speed, 
						response.data.current.wind_dir])
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
			
			<h3> Weather in the Capital </h3>
			<p> Temperature:  {countryWeather[0]} </p>
			<img src={countryWeather[1]} alt='weather'/>
			<p> Wind {countryWeather[2]} {countryWeather[3]} </p>
			
		</div>
	)
}

export default GetCountryDetails