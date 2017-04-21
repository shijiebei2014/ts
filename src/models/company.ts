import db from '../db'
import User from './user'
import {Sequelize} from 'sequelize'

let Company = db.define('company', {
	name: Sequelize.STRING
}, {
  freezeTableName: true // Model tableName will be the same as the model name
})

//Company.hasOne(User)
export default Company

