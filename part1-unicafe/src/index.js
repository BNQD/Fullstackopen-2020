import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onClick}) => (
	<button onClick = {onClick}>
		{text}
	</button>
)

const Statistic = ({text, value, symbol}) => (
	<tr key = {value}> 
		<td>{text}</td>
		<td>{value} {symbol}</td>
	</tr>
)

const Statistics = ({good, neutral, bad}) => {
	const total = good + bad + neutral
	if (total === 0){
		return (
			<p> No Feedback Given </p>
		)
	}
	else {
		return (
			<div>
				<table>
					<tbody>
					<Statistic text='Good' value={good} />
					<Statistic text='Neutral' value={neutral} />
					<Statistic text='Bad' value={bad} />
					<Statistic text='Total' value ={total} />
					<Statistic text='Average' value={Math.round((good-bad)*100 / total)/100} />
					<Statistic text='Positive' value={Math.round(good/total * 10000)/100} symbol='%' /> 
					</tbody>
				</table>
			</div>
		)
	}
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	

  return (
	<div>
		<h1> Give Feedback </h1>
		<Button text = 'Good' onClick = {() => setGood(good+1)} />
		<Button text = 'Neutral' onClick = {() => setNeutral(neutral+1)}/>
		<Button text = 'Bad' onClick = {() => setBad(bad+1)}/>
		
		<br/>
		<h2> Statistics </h2>
		<Statistics good = {good} neutral = {neutral} bad = {bad}/>
		
		
		
	</div>
    
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)