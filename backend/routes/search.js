var express = require('express');
var router = express.Router();

const users = require('../controller/search');

/* GET users listing. */
router.get('/list', users.findAll
// function(req, res, next) {
//   debugger;
//   console.log("list in search get");
//   res.send('respond with a resource');
//   con.query('SELECT * FROM authors', (err,rows) => {
//     if(err) throw err;
  
//     console.log('Data received from Db:');
//     console.log(rows);
//   });
// }
);

module.exports = router;
