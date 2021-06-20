const DB = require('../config/database');
const { DataTypes } = require('sequelize-cockroachdb');

const Plant = DB.define('plants', {
    plant_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    plant_title: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    water_amount: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    sunlight_needed: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    active_seasons: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    active_from: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    manure: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    diseases: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    growing_method: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    special_requirements: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    additional_info: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    author_name: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

Plant.sync({
    force: true
}).then((plant) => {
    console.log('=> Plant table connected!');
});

module.exports = Plant;
