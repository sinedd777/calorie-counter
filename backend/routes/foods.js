const router = require('express').Router();
let Food = require('../models/food.model');
const jwt = require('jsonwebtoken');


router.route('/').get((req, res) => {
  const token = req.headers['x-access-token']
  const username = jwt.verify(token, 'secret123')

  Food.find({ username: username })
      .then(foods => res.json(foods))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/daily').get((req, res) => {
    const username = req.query.username;
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate)

    Food.find({ username: username , date : { $gte: new Date(startDate),  $lt: new Date(endDate)} })
        .then(foods => res.json(foods))
        .catch(err => res.status(400).json('Error: ' + err));
});


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