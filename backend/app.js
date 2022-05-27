const express = require('express');
const app = express();
const cors = require('cors');
// const router = express.Router()

const {logger} = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const {errorHandler} = require('./middlewares/errorHandler');

app.use(
	cors({
		origin: process.env.APP_URL,
	})
)

app.use(express.json());

app.use(logger)
// app.use(auth)

const dashboard = require('./routes/dashboard')
app.use('/api/dashboards', dashboard)


app.get('/api/public', (req, res) => {
	console.log('public')
	res.send('Hello world - public')
})
app.get('/api/private', auth({
	block: true
}), (req, res) => {
	if (!res.locals.userId) return res.sendStatus(401)
	console.log('private')
	res.send(`Hello world - private id: ${res.locals.userId}!`)
})

app.get('/api/prublic', auth({
	block: false
}), (req, res) => {
	if (!res.locals.userId) return res.send('hello world prublic')
	res.send(`hello world prublic your id is: ${res.locals.userId}`)
})

//error handler utolsonak
app.use(errorHandler)



module.exports = app