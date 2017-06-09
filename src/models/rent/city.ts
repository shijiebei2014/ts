import db from '../../rent_db'
import Sequelize from 'sequelize'

let City = db.define('city', {
    cityName: Sequelize.STRING,
    provinceName: Sequelize.STRING,
    _58_domain: Sequelize.STRING,
}, {
    freezeTableName: true // Model tableName will be the same as the model name
})

//User.belongsTo(Company)
export default City