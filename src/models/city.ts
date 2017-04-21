import db from '../db'
import Sequelize from 'sequelize'

let City = db.define('city', {
	cityName: Sequelize.STRING,
	cityId: Sequelize.STRING,
	pinyin: Sequelize.STRING,
	cityVersion: Sequelize.INTEGER,
	hot: Sequelize.INTEGER,
	supportSubway: Sequelize.INTEGER
}, {
  freezeTableName: true // Model tableName will be the same as the model name
})

//User.belongsTo(Company)
export default City