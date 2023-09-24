const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Actor = sequelize.define('Actor', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    image: {
        type: DataTypes.STRING, 
        allowNull: true 
    },
    birthday: {
        type: DataTypes.DATEONLY, 
        allowNull: true 
    },
});

module.exports = Actor;
