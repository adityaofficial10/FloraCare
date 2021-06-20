const DB = require('../config/database');
const { DataTypes } = require('sequelize-cockroachdb');

const Classification = DB.define('classification', {
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    plant_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(2000),
        allowNull: true
    }
});

module.exports = Classification;