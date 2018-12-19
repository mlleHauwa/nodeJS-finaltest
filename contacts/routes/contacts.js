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
let contactSchema = new mongoose.Schema({
	firstName: String,
  	lastName: String,
 	phoneNumber: {
		type: String,
		unique: true
	},
  	email: String,
  	address: String,  
});


//declare schema
const Contact = mongoose.model('Contact', contactSchema);


//Create
router.post('/', function(req, res, next) {
	let contact = new Contact(req.body);
	contact.save(function(err, result) {	
		if (err) return console.error(err);
		res.status(201).send(result);
	});
});

//Read
router.get('/:id', function(req, res, next) {
	Contact.findById(req.params.id, function(err, result) {
		if (err) return console.error(err);
	    res.status(201).send(result);
	});
});

//Read All
router.get('/', function(req, res, next) {
	Contact.find(function(err, contacts) {
		if (err) return console.error(err);
		res.status(201).send(contacts);
	});
});

//Update
router.put('/:id', function(req, res, next) {
	Contact.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
		if (err) return console.error(err);
		res.send('Contact successfully udpated.');
	});
});

//Delete 
router.delete('/:id', function(req, res, next) {
	Contact.findByIdAndRemove(req.params.id, function (err) {
		if (err) return console.error(err);
		res.status(201).send('Contact successfully deleted.');
	});
});

module.exports = router;