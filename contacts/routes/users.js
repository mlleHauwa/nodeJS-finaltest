const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected successfully');
});


//create template
let userSchema = new mongoose.Schema({
  	name: String,
  	email:  {
		type: String,
		unique: true,
		required: true
	},
  	password:  {
		type: String,
		unique: true,
		required: true
	},
	phoneNumber: {
		type: String,
		unique: true
	}
});


//declare schema
const User = mongoose.model('User', userSchema);


const auth = (req, res, next) => {
	if (user.auth) return next();
		else next(new Error('Not Authorized'));
}

//Sign Up
router.post('/', function(req, res, next) {
	let user = new User(req.body);
	user.save(function(err, result) {	
		if (err) return console.error(err);
		res.status(201).send('User successfully Created.');
	});
});

//Log In
router.post('/logIn', function(req, res, next) {
	let email = req.body.email;
	let password = req.body.password;
	
	User.findOne({email: email, password: password}, function(err, result) {
		if(err) {
			console.log(err);
			return res.status(500).send('Email or Password is Incorrect.');
		}
		if(!result) {
			return res.status(401).send('Email or Password is Incorrect.');
		}
		req.session.user = result;
		res.send('You have logged in Successfully.');
	});
});

//Authorization
router.get('/', function(req, res) {
	if(!req.session.user) {
		return res.status(401).send('Not Authorized!');
	}return res.status(200).send("Welcome to your Contacts Home");
});

// //Read All
// router.get('/', function(req, res, next) {
// 	User.find(function(err, users) {
// 		if (err) return console.error(err);
// 		res.status(201).send(users);
// 	});
// });

// //Read
// router.get('/:id', function(req, res, next) {
// 	User.findById(req.params.id, function(err, result) {
// 		if (err) return console.error(err);
// 	    res.status(201).send(result);
// 	});
// });

// //Update
// router.put('/:id', function(req, res, next) {
// 	User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
// 		if (err) return console.error(err);
// 		res.send('User successfully udpated.');
// 	});
// });

// //Delete 
// router.delete('/:id', function(req, res, next) {
// 	User.findByIdAndRemove(req.params.id, function (err) {
// 		if (err) return console.error(err);
// 		res.status(201).send('User successfully deleted.');
// 	});
// });


module.exports = router;
