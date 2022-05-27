const app = require('../app')
const mockserver = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server');

const sum = (a, b) => {
	return a + b
}

test('adds a + b', () => {
	//given
	//no setup required

	// when
	const result = sum(1,2)
	// then
	expect(result).toBe(3)
});

test('/random endpoint gives back status 404', async () => {
	//given
	const server = mockserver(app);
	//when
	const response = await server.get('/api/random')
	//then
	expect(response.status).toBe(404)
});

test('/mongo inmemory server working', async () => {
	//given
	const mongod = await MongoMemoryServer.create()
	const uri = mongod.getUri()
	const connection = await mongoose.connect(uri)

	const Cat = mongoose.model('Cat', {name: String})
	const kitty = new Cat({name: 'macska'})
	//when
	await kitty.save()
	//then
	const catInDb = await Cat.findOne()
	expect(catInDb.name).toBe('macska')
	await connection.disconnect();
	await mongod.stop();
});



