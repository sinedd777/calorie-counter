const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

router.route('/authorised').get( async (req, res) => {
	try {
		const token = req.headers['x-access-token']
		const username = jwt.verify(token, 'secret123')

		const user = await User.findOne({
			username: username,
		})

		if(user.role !== 'admin'){
			res.json({ status: 'error', error: 'Not Admin' })
		}else{
			res.json(true)
		}
	}
	catch (err) {
		res.json({ status: 'error', error: 'No token' })
	}
})

router.route('/').get( async (req, res) => {
	
	try {
		const token = req.headers['x-access-token']
		const username = jwt.verify(token, 'secret123')

		const user = await User.findOne({
			username: username,
		})

		if(user.role !== 'admin'){
			res.json({ status: 'error', error: 'Not Admin' })
		}else{
			User.find({}, { username:1, calorieLimit:1, role: 1})
			.then(users => res.json(users))
			.catch(err => res.status(400).json('Error: ' + err));
		}
	}
	catch (err) {
		res.json({ status: 'error', error: 'No token' })
	}
})

router.route('/login').post( async (req, res) => {
  const user = await User.findOne({
		username: req.body.username,
	})
	console.log(user);
	if (!user) {
		console.log(user,'hello');

		return res.json({ status: 'error', error: 'Invalid login' })
	}
	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign( user.username, 'secret123')

		return res.json({ status: 'ok', user: token, role: user.role })
	} else {
		return res.json({ status: 'error', user: false })
	}
});

router.route('/limit').get((req, res) => {
	const token = req.headers['x-access-token']
	const username = jwt.verify(token, 'secret123')
  
	User.findOne({ username: username })
		.then(user => res.json(user.calorieLimit))
		.catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/register').post( async (req, res) => {
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			username: req.body.username,
			password: newPassword,
			role: 'user',
			calorieLimit: 2100
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate Username' })
	}
})

router.route('/delete').post( async (req, res) => {
	try {
		const token = req.headers['x-access-token']
		const username = jwt.verify(token, 'secret123')
		const targetUsername = req.body.username;

		const user = await User.findOne({
			username: username,
		})

		if(user.role !== 'admin'){
			res.json({ status: 'error', error: 'Not Admin' })
		}else{
			User.deleteOne({ username: targetUsername })
			.then(users => res.json('User Removed!'))
			.catch(err => res.status(400).json('Error: ' + err));
		}
	}
	catch (err) {
		res.json({ status: 'error', error: 'No token' })
	}
})

router.route('/update').post( async (req, res) => {
	try {
		const token = req.headers['x-access-token']
		const username = jwt.verify(token, 'secret123')
		const targetUsername = req.body.username;
		const calorieLimit = req.body.calorieLimit;

		const user = await User.findOne({
			username: username,
		})

		if(user.role !== 'admin'){
			res.json({ status: 'error', error: 'Not Admin' })
		}else{
			User.updateOne({ username: targetUsername}, { $set : { calorieLimit: calorieLimit }})
			.then(() => res.json('User Updated'))
			.catch(err => res.status(400).json('Error: ' + err));
		}
	}
	catch (err) {
		res.json({ status: 'error', error: 'No token' })
	}
})

module.exports = router;