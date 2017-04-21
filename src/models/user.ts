import db from '../db'
import Company from '../models/company'
import Project from '../models/project'
import Sequelize from 'sequelize'

let User = db.define('user', {
	name: Sequelize.STRING
}, {
  freezeTableName: true // Model tableName will be the same as the model name
})

//User.belongsTo(Company)
export default User