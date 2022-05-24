// const logger = (res, req, next) => {
// 	console.log('logging...')
// 	next()
// }

// module.exports = logger;

exports.logger = (res, req, next) => {
	console.log('logging...')
	next()
}