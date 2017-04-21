import db from './db'
import User from './models/user'
import Company from './models/company'
import Project from './models/project'

import './models/index'

/*db.sync({
	force: false
}).then(function() {
	return Company.findOrCreate({
		where : {name: 'company1'},
		defaults: {name: 'company1'},		
	})
}).then(function(company) {
	return Company.findOne({
		name: company.name
	})
}).then(function(comapny){
	return User.findOrCreate({
		where : {name: 'user1'},
		defaults: {name: 'user1', companyId: comapny["id"]},
	})
}).then(function(user) {
	return Company.findAll({ //多表关联
		where : {name: 'company1'},
		include: {
			model: User
		}
	})
}).then(function(companies) {
	// console.log(companies[0].get({
	// 	plain: true
	// }).user)
	console.log(companies[0].dataValues.user.dataValues)
}).catch(function(err){
	console.log(err)
})*/

//npm install --save @types/es6-promise
//Project.belongsToMany(User, {through: 'UserProject'})
//Project.hasMany(User)
// let test_one_has_many = async function() {
// 	//建表
// 	await db.sync({force:true})
// 	//新建project
// 	let project = await Project.create({
// 		name: 'project1',
// 		users: [{
// 			name: 'user1'
// 		}, {
// 			name: 'user2'
// 		}]
// 	}, {
// 	  include: [ User ]
// 	})
// 	console.log(project.get({
// 		plain: true
// 	}).users.length)

// 	新建user
// 	let user1 = await User.create({
// 		name: 'user1',
// 	})
// 	//新建user
// 	let user2 = await User.create({
// 		name: 'user2',
// 	})
// 	关联
// 	await project.setUsers([user1, user2])
// 	let users = await project.getUsers()
// 	console.log(users[0].get({plain: true}))

// }
// test_one_has_many().then(function() {
// 	console.log('完成')
// }).catch(function(err) {
// 	console.log(err)
// })

/*Project.belongsToMany(User, {through: 'UserProject'})
User.belongsToMany(Project, {through: 'UserProject'})
let test_belongs_to_many = async function() {
	//建表
	await db.sync({force:true})
	//新建project
	let project = await Project.create({
		name: 'project1'
	})
	let project2 = await Project.create({
		name: 'project2'
	})
	//新建user
	let user1 = await User.create({
		name: 'user1',
	})
	//新建user
	let user2 = await User.create({
		name: 'user2',
	})
	//新建user
	let user3 = await User.create({
		name: 'user3',
	})
	//关联
	await user1.addProject(project)
	await user2.addProject(project)
	await user3.addProject(project2)
	
	let users = await User.findAll({
		include: [{
			model: Project, //关联project
			through: { //从哪里获取project
				//attributes: ['projectId'],
				where: {
					projectId: project.get({
						plain: true
					}).id
				}
			}
		}],
	})
	console.log(users.length)
	let projects = await Project.findAll({
		include: [{
			model: User, //关联project
			through: { //从哪里获取project
				//attributes: ['projectId'],
				where: {
					projectId: user1.get({
						plain: true
					}).id
				}
			}
		}],
	})
	console.log(projects[0].get({
		plain: true
	}))
}

test_belongs_to_many().then(function() {
	console.log('完成')
}).catch(function(err) {
	console.log(err)
})*/

/*
//user has project
// let test_has = async function() {
// 	await db.sync({
// 		force: true
// 	})
// 	let user = await User.create({
// 		name: 'user1',
// 		project: {
// 			name: 'project1'
// 		}
// 	}, {
// 		include: [Project]
// 	})
// 	console.dir(user.get({
// 		plain:true
// 	}))
// }
// test_has()

// let test_get_has = async function() {
// 	let user = await User.findOne({
// 		where: {
// 			name: 'user1',
// 		},
// 		include: {
// 			model: Project
// 		}
// 	})
// 	let project = await user.getProject()
// 	console.log(project.toJSON())
// 	console.log(user.toJSON().project)
// }
// test_get_has()
*/


//project belongsTo user
// let test_belongsTo = async function() {
// 	await db.sync({
// 		force: true
// 	})
// 	let project = await Project.create({
// 		name: 'project1',
// 		user: {
// 			name: 'user1'
// 		}
// 	}, {
// 		include: [User]
// 	})
// 	console.dir(project.get({
// 		plain:true
// 	}))
// }
// test_belongsTo()

// let test_get_belongTo = async function() {
// 	let project = await Project.findOne({
// 		where : {
// 			name: 'project1'
// 		}
// 	});
// 	let user = await project.getUser()

// 	console.log(user.toJSON())

// 	project = await Project.findOne({
// 		where: {
// 			name: 'project1'
// 		},
// 		include: [User]
// 	})

// 	console.log(project.user.toJSON())
// }
// test_get_belongsTo()


// let test_set_project = async function() {
// 	let project = await Project.create({
// 		name: 'project1',
// 	});

// 	let user = await User.findOne({
// 		name: 'user1'
// 	})
// 	project = await project.setUser(user)
// 	console.log(project.user.toJSON())
	
// }
// test_set_project()

/*let find_project = async function() {
	let project = await Project.findOne({
		where : {name: 'project1'},
		attributes: ['id', ['userId']]
	})
	console.log(project.toJSON())
	return 1
}
find_project().catch(function(err) {
	console.log(err)
})*/


// All associations use SET NULL on delete and use CASCADE on update,
// except for n:m, which also uses CASCADE on delete, use CASCADE on update
/*let cascade_delete = async function () {
	let user = await User.findOne({
		name: 'user1'
	});
	if (user) { //级联删除,外键置为空(返回删除的数据)
		let result = await user.destroy()
		console.log(result)
	}
}

cascade_delete().catch(function(err) {
	console.log(err)
})
let cascade_update = async function() {
	let user = await User.findOne({
		name: 'user1'
	});
	if (user) { //级联删除,外键置为空(返回删除的数据)
		//instance不能修改主键,model可以;
		let result = await User.update({id: 3}, {where : {id: 2} })
		console.log(result)
	}
}
cascade_update().catch(function(err) {
	console.log(err)
})
*/