const mongoose = require('mongoose')
const config = require('../utils/config')

const userSchema = new mongoose.Schema({
  username: {
		type: String,
		minlength: 3,
		required:true,
		unique: true
	},
  name: {
		type: String,
		required: true
	},
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

const User = mongoose.model('User', userSchema)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = User