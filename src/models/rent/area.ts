import db from '../../rent_db'
import Sequelize from 'sequelize'

let Area = db.define('area', {
    areaName: Sequelize.STRING,
    _58_domain: Sequelize.STRING,
}, {
        freezeTableName: true // Model tableName will be the same as the model name
    })

export default Area