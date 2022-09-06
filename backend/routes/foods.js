const router = require('express').Router();
let Food = require('../models/food.model');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');


router.route('/all').get(async (req, res) => {
  const token = req.headers['x-access-token']
  const username = jwt.verify(token, 'secret123')

  const user = await User.findOne({
    username: username,
  })
  if (user.role !== 'admin') {
    res.json({ status: 'error', error: 'Not Admin' })
  } else {
    Food.find()
      .then(foods => res.json(foods))
      .catch(err => res.status(400).json('Error: ' + err));
  }
});


router.route('/').get((req, res) => {
  const token = req.headers['x-access-token']
  const username = jwt.verify(token, 'secret123')

  Food.find({ username: username })
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/stats').get(async (req, res) => {
  const token = req.headers['x-access-token']
  const username = jwt.verify(token, 'secret123')

  const multiplier = req.query.multiplier;

  const user = await User.findOne({
    username: username,
  })
  if (user.role !== 'admin') {
    res.json({ status: 'error', error: 'Not Admin' })
  } else {
    Food.count({ date: { $gte: new Date(Date.now() - multiplier * 604800000), $lt: new Date(Date.now() - ((multiplier === '0' ? 1 : multiplier) - 1) * 604800000) } })
      .then(foods => res.json(foods))
      .catch(err => res.status(400).json('Error: ' + err));
  }
});

router.route('/weekly').get(async (req, res) => {
  const token = req.headers['x-access-token']
  const username = jwt.verify(token, 'secret123')

  const user = await User.findOne({
    username: username,
  })

  if (user.role !== 'admin') {
    res.json({ status: 'error', error: 'Not Admin' })
  } else {
    Food.aggregate(
      [{
        $match: {
          date: {
            $gte: new Date(Date.now() - 604800000),
            $lt: new Date(Date.now())
          }
        }
      },
      {
        $group: {
          _id: "$username",
          calories: { $sum: "$calories" }
        }
      }]
    )
      .then(foods => res.json(foods))
      .catch(err => res.status(400).json('Error: ' + err));
  }
})

router.route('/add').post((req, res) => {
  const token = req.headers['x-access-token']
  const username = jwt.verify(token, 'secret123')

  const name = req.body.name;
  const calories = Number(req.body.calories);
  const date = req.body.date;

  const newFood = new Food({
    username,
    name,
    calories,
    date,
  });

  newFood.save()
    .then(() => res.json('Food added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').post(async (req, res) => {
  const token = req.headers['x-access-token']
  const username = jwt.verify(token, 'secret123')
  const id = req.body.id;
  const user = await User.findOne({
    username: username,
  })

  if (user.role !== 'admin') {
    res.json({ status: 'error', error: 'Not Admin' })
  } else {
    Food.deleteOne({ _id: id })
      .then(foods => res.json(foods))
      .catch(err => res.status(400).json('Error: ' + err));
  }
});

router.route('/update').post(async (req, res) => {
  const token = req.headers['x-access-token']
  const username = jwt.verify(token, 'secret123')
  const user = await User.findOne({
    username: username,
  })

  const id = req.body.id;
  const name = req.body.name;
  const calories = req.body.calories;
  const date = req.body.date;


  if (user.role !== 'admin') {
    res.json({ status: 'error', error: 'Not Admin' })
  } else {
    Food.updateOne({ _id: id }, { $set: { name: name, calories: calories, date: date } })
      .then(foods => res.json(foods))
      .catch(err => res.status(400).json('Error: ' + err));
  }
});

// router.route('/:id').get((req, res) => {
//   Food.findById(req.params.id)
//     .then(food => res.json(food))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').delete((req, res) => {
//   Food.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Food deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//   Food.findById(req.params.id)
//     .then(food => {
//       food.username = req.body.username;
//       food.name = req.body.name;
//       food.calories = Number(req.body.calories);
//       food.date = Date.parse(req.body.date);

//       food.save()
//         .then(() => res.json('Food updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;