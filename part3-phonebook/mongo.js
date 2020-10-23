const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
	`mongodb+srv://admin:${password}@cluster0.m3w3c.mongodb.net/Persons?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
	})

const Person = mongoose.model('Person', personSchema)
	
if (process.argv.length === 3) {
	console.log('Phonebook:')
	//Print database data
	Person.find({}).then(person => {
		person.forEach(x => {
			console.log(`${x.name} ${x.number}`)
		})
		mongoose.connection.close()
	})
  
}

else if (process.argv.length === 5) {
	//Add data to database
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	})

	person.save().then(result => {
		console.log(`Added ${process.argv[3]} Number: ${process.argv[4]} to phonebook`)
		mongoose.connection.close()
	})
}





/*

*/