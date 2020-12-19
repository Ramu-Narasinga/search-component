var express = require('express');
var router = express.Router();

const users = require('../controller/search');

/* GET users listing. */
router.get('/list', users.findAll);
router.get('/users', users.find);

module.exports = router;
