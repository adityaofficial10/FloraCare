const DB = require('../config/database');
const { DataTypes } = require('sequelize-cockroachdb');

const WaterStatus = DB.define('status', {
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    water_status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    moisture_percentage: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
});

module.exports = WaterStatus;