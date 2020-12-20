module.exports = (sequelize, Sequelize) => {
    const Items = sequelize.define("items", {
        name: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.STRING
        }
    }
    );
    return Items;
};