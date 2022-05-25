const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
	title: {
		type: String,	//empty string NONO!
		required: true,
	},
	content: {
		type: String,
		required: true,
	},//empty sting is enough
	isDone: {
		type: Boolean,
		required: false,
	},
})

const dashboardSchema = new mongoose.Schema({
	title: {
		type: String,	//empty string NONO!
		required: true,
	},
	todos: [todoSchema],	//empty list is default
})

var userSchema = new mongoose.Schema({
	username:{
		type:String,	//empty string NONO!
		required:true,
		unique:true,
		index:true,
	},
	googleID:{		//empty string NONO! + validation
		type:String,
		required:true,
		unique:true,
	},
	// password:{		//empty string NONO! + validation
	// 	type:String,
	// 	required:true,
	// },
	dashboard: [dashboardSchema], //empty list is default
});

module.exports = mongoose.model('User', userSchema);