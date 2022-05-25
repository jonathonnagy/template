const router = require('express').Router
const auth = require('../middlewares/auth')
const User = require('../model/user')

router.get('/api/dashboards/', auth({block: true}), async (req, res) => {
	//send all dashboards for user
	
	//needs auth middleware with block
	//find user with userID from res.locals.userId
	//return user.dashboards
	
	const user = User.findById(res.locals.userId);
	res.json({user});
})

// router.get('/api/dashboards/:id', async (req, res) => {
// 	//send :id dashboards for user
// })

// router.get('/api/dashboards/:id/todos', async (req, res) => {
// 	//send all todos from :id dashboards for user
// })

router.get('/api/dashboards/:id/todos/:todoId', async (req, res) => {
	//send :todoID todo from :id dashboard for user
})

router.post('/api/dashboards/', async (req, res) => {
	//create dashboard for user, send created :id
})

router.patch('/api/dashboards/:id', async (req, res) => {
	//update existing dashboard
})

router.patch('/api/dashboards/:id/todos/:todoId', async (req, res) => {
	//update existing: todoId todo in : id dashboard
})

router.patch('/api/dashboards/:id', async (req, res) => {
	//delete dashboard completly
})

router.patch('/api/dashboards/:id', async (req, res) => {
	//delete dashboard
})