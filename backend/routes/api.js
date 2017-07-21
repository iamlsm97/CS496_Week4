var express = require('express')
var router = express.Router()

let Models = require('../models/schema')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/roomlist', function (req, res, next) {
  Models.Room.find(function (err, rooms) {
    if (err) return res.status(500).send({ error: 'database failure' })
    res.json(rooms)
  })
})

module.exports = router
