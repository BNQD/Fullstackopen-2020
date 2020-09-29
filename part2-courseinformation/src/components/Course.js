import React from 'react'


const Header = (props) => {
	return(
		<>
			<h1> {props.course} </h1>
		</>
		)
}

const Part = (props) => {
	return (
		<>
			{props.part} {props.exercises}
		</>
	)
}

const Content = (props) => {

	const content = props.parts.map (part => <p key={part.id}> <Part part = {part.name} exercises = {part.exercises} /> </p>)
	return (
	<div>
		{content}
	</div>
	)
	
}

const Total = (props) => {
	const total = props.parts.reduce((s, p) => s + p.exercises, 0)
	
	return (
		<>
			<p> Number of exercises {total}</p>	
		</>
	)
}

const Course = (props) => {
	const {course} = props
	return (
		<div>
			<Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
		</div>
	)
}

export default Course