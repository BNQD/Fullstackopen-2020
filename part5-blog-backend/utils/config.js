require('dotenv').config()

PORT = process.env.PORT
MONGODB_URI = process.env.MONGODB_URI

SECRET = process.env.SECRET

module.exports = {
	PORT,
	SECRET,
	MONGODB_URI
}