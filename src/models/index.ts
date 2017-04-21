import User from './user'
import Company from './company'
import Project from './project'

//User.hasOne(Project)
Project.belongsTo(User)