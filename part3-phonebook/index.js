require('dotenv').config()

const express = require('express')
const app = express()
const cors = require ('cors')
const Person = require('./models/person')

const morgan = require ('morgan')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan(function (tokens, request, response) {
	return [
		tokens.method(request, response),
		tokens.url(request, response),
		tokens.status(request, response),
		tokens.res(request, response, 'content-length'), '-',
		tokens['response-time'](request, response), 'ms'
	].join(' ')
}))

app.get('/info', (request, response) => {
	Person.countDocuments({}, function (err, count) {
		response.send(`
		<p> Phonebook has info for ${count} people </p>
		<p> ${Date()} </p>
		`)
	})
	
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(x => {
		response.json(x)
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id).then(person => {
		if (person) {
			response.json(person)
		} else {
			response.status(404).end()
		}
	})
		.catch(error => {
			next(error)
		})
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body
	console.log(body)

	const person = new Person ({
		name: body.name,
		number: body.number,
	})
	
	person.save()
		.then(x => {
			response.json(x)
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body
	
	const person = {
		name: body.name,
		number: body.number,
	}
	
	Person.findByIdAndUpdate(request.params.id, person, {new: true, runValidators:true})
		.then (updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => {
			next(error)
		})
})

const errorHandler = (error, request, response, next) => {
	//console.error(error.message)
	console.log(error.name)
	if(error.name === 'CastError'){
		return response.status(400).send({ error: 'malformatted id' })
	}
	
	next(error)
}

app.use(errorHandler)


const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})