const DB = require('../config/database');
const { DataTypes } = require('sequelize-cockroachdb');

const Disease = DB.define('disease', {
    disease_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    disease_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    treatment: {
        type: DataTypes.STRING(2000),
        allowNull: true
    }
});

module.exports = Disease;