const db = require("../model"); // models path depend on your structure
const Users = db.users;

exports.findAll = (req, res) => {
  
    Users.findAll({ })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};