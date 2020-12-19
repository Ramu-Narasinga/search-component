const db = require("../model"); // models path depend on your structure
const Users = db.users;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// returns the complete list of users
exports.findAll = (req, res) => {

    Users.findAll({})
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

// API accepts search value from req.query.value
// checks if a search value is substring in name, address, pincode
exports.find = (req, res) => {
    const searchQuery = req.query.value;
    Users.findAll({
        where: {
            [Op.or]: {
                name: {
                    [Op.like]: '%' + searchQuery + '%'
                },
                address: {
                    [Op.like]: '%' + searchQuery + '%'
                },
                pincode: {
                    [Op.like]: '%' + searchQuery + '%'
                }
            }
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}