import React from 'react'

import GetCountryDetails from './GetCountryDetails'

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
}

export default FilteredNames