require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app')
const port = process.env.PORT



// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/templateDB', (err) => {
	if (!err) {
		console.log('MongoDB Connection Succeeded.')
		app.listen(port, () => {
			console.log(`Example app listening on port ${port}`)
		})
	} else {
		console.log('Error in DB connection: ' + err)
	}
});
