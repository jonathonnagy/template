const router = require('express').Router()
const auth = require('../middlewares/auth')
const User = require('../model/user')



router.get('/', auth({block: true}), async (req, res) => {
	//send all dashboards for user
	
	//needs auth middleware with block
	//find user with userID from res.locals.userId
	//return user.dashboards
	
	const user = await User.findById(res.locals.userId);
	res.json({user});
})

// router.get('/:id', async (req, res) => {
// 	//send :id dashboards for user
// })

// router.get('/:id/todos', async (req, res) => {
// 	//send all todos from :id dashboards for user
// })

router.get('/:id/todos/:todoId', async (req, res) => {
	//send :todoID todo from :id dashboard for user
})

router.post('/', async (req, res) => {
	//create dashboard for user, send created :id
})

router.patch('/:id', async (req, res) => {
	//update existing dashboard
})

router.patch('/:id/todos/:todoId', async (req, res) => {
	//update existing: todoId todo in : id dashboard
})

router.patch('/:id', async (req, res) => {
	//delete dashboard completly
})

router.patch('/:id', async (req, res) => {
	//delete dashboard
})

module.exports = router