import db from '../db'
import User from '../models/user'
import Sequelize from 'sequelize'

let Project = db.define('project', {
	name: Sequelize.STRING
}, {
  freezeTableName: true // Model tableName will be the same as the model name
})

export default Project