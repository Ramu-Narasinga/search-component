const db = require("../model"); // models path depend on your structure
const Users = db.users;
const Items = db.items;
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
// checks if a search value is substring in id, name, address, pincode
exports.find = (req, res) => {
    const searchQuery = req.query.value;
    // search in users row fields name || address || pincode
    Users.findAll({
        where: {
            [Op.or]: {
                id: {
                    [Op.like]: '%' + searchQuery + '%'
                },
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
        },
        include: ["items"]
    })
        .then(data => {
            // search in Items row fields name
            Items.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + searchQuery + '%'
                    }
                },
                include: Users
            })
                .then(itemsData => {
                    let searchResults = {
                        users: data, 
                        items: itemsData
                    };
                    res.send(searchResults);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving tutorials."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}