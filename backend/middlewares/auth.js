
const auth = (meddlewareParams) => {
	const _auth = (req, res, next) => {
		console.log('Authentication in progress')
		const userId = req.header('authorization')
		res.locals.userId = userId
		if (meddlewareParams.block && !res.locals.userId) return res.sendStatus(401)
		next()
	}
	return _auth
}
module.exports = auth