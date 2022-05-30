const app = require('../app')
const mockserver = require('supertest')
const mongoose = require('mongoose')
const User = require('../model/user')
const { MongoMemoryServer } = require('mongodb-memory-server');
const { startDB, stopDB, deleteAll } = require('./util/inMemoryDB')

describe('/api/dashboard/ get tests', () => {

	let connection;
	let mongod;
	let client

	beforeAll(async () => {
		const result = await startDB()
		connection = result[0]
		mongod = result[1]
		client = mockserver.agent(app)

	})

	afterEach(async() => {
		deleteAll(User)
	})

	afterAll(async() => {
		stopDB(connection, mongod)
	})

	test('/mongo inmemory server working', async () => {
		//given
		// const mongod = await MongoMemoryServer.create()
		// const uri = mongod.getUri()
		// const connection = await mongoose.connect(uri)

		// const newUser = new User({						///	az inMemoryDB-be megy!!	
		// 	username: 'sanyi',
		// 	googleId: 123
		// })
		// await newUser.save()

		const client = mockserver.agent(app)
		client.set('authorization', newUser._id)

		//when
		const response = await client.get('/api/dashboards')

		//then
		expect(response.status).toBe(200)
		const responseData = response.body

		expect(responseData.user.dashboards).toStrictEqual([])
		await connection.disconnect();
		await mongod.stop();
	});

	test('deleted user recieves nothing', async () => {
		//given
		const mongod = await MongoMemoryServer.create()
		const uri = mongod.getUri()
		const connection = await mongoose.connect(uri)

		const newUser = new User({
			username: 'sanyi',
			googleId: 123
		})
		await newUser.save()

		const client = mockserver.agent(app)
		client.set('authorization', newUser._id)

		await User.deleteMany()

		//when
		const response = await client.get('/api/dashboards')
		const responseData = response.body
		
		//then
		expect(response.status).toBe(200)
		expect(responseData.user).toBeNull()

		await connection.disconnect();
		await mongod.stop();
	});

})