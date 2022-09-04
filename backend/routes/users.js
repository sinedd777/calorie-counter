const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');


router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // const oldUser = await User.findOne({ username });
  // if (oldUser) {
  //   return res.status(409).send("User Already Exist. Please Login");
  // }

  // encryptedPassword = await bcrypt.hash(password, 10);

  // const token = jwt.sign(
  //   { user_id: user._id, email },
  //   process.env.TOKEN_KEY,
  //   {
  //     expiresIn: "2h",
  //   }
  // );
  // // save user token
  // user.token = token;
  // const newUser = new User({username,encryptedPassword});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;