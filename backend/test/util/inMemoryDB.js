const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose')

// const newUser = new User({
// 	username: 'sanyi',
// 	googleId: 123
// })
// await newUser.save()

const startDB = async () => {
	const mongod = await MongoMemoryServer.create()
	const uri = mongod.getUri()
	const connection = await mongoose.connect(uri)
	return [connection, mongod]
	
}

const stopDB = async (connection, mongod) => {
	await connection.disconnect();
	await mongod.stop();
}

const deleteAll = async (...collections) => {
	// for (const collection of collections) {
	// 	collection.deleteMany()
	// }

	const promises = collections.map(collection => collection.deleteMany())
	await Promise.all(promises)
}

module.exports = { startDB, stopDB, deleteAll }