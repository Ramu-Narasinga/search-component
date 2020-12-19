module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        pincode: {
            type: Sequelize.STRING
        }
    });
    return Users;
};