import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const genRandom = ({high}) => {
	return Math.floor(Math.random()*high)
}

const MostVoted = ({votes, anecdote}) => {
	console.log(anecdote)
	if (votes == 0){
		return (
			<p> All anecdotes have 0 votes </p>
		)
	}
	else {
		return (
		<>
			<p> {anecdote} </p>
			<p> Currently: {votes} votes </p>
		</>
		)
	}
}

const App = (props) => {
	const total_length = props.anecdotes.length
	
  const [selected, setSelected] = useState(0)
	const [votes, setPoints] = useState(new Array(total_length+1).join('0').split('').map(parseFloat))
	
	const most_votes = Object.keys(votes).reduce(function(a, b){ return votes[a] > votes[b] ? a : b })
	
	
	const updatePoints = index => {
		const copy = {...votes}
		copy[index] += 1
		setPoints(copy)
		console.log(copy)
	}
	
  return (
    <div>
			<h1> Anecdote of the Day </h1>
			<p> {props.anecdotes[selected]} </p>
			<p> Currently: {votes[selected]} votes </p>
			
			<button onClick = {() => setSelected(Math.floor(Math.random()*total_length))}>
					Random Anecdote
			</button>
			<button onClick = {() => updatePoints(selected)}>
				Vote
			</button>
			
			<h2> Anecdote with Most Votes </h2>
				<MostVoted votes={votes[most_votes]} anecdote={props.anecdotes[most_votes]} />
			
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)