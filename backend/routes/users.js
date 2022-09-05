const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post( async (req, res) => {
  const user = await User.findOne({
		username: req.body.username,
	})
	if (!user) {
		return { status: 'error', error: 'Invalid login' }
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

module.exports = router;