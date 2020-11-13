require('dotenv').config()

PORT = process.env.PORT
if(process.env.NODE_ENV === 'test'){
	MONGODB_URI = process.env.MONGODB_URI_TESTING
} else {
	MONGODB_URI = process.env.MONGODB_URI
}

SECRET = process.env.SECRET

module.exports = {
	PORT,
	SECRET,
	MONGODB_URI
}