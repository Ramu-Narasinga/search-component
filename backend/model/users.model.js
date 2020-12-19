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
    }, {
        indexes: [
          // add a FULLTEXT index
          { type: 'FULLTEXT', name: 'text_idx', fields: ['name', 'address', 'pincode'] }
        ]
      });
    return Users;
};