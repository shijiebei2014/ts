import db from '../../rent_db'
import Sequelize from 'sequelize'

let Agent = db.define('agent', {
    agentName: Sequelize.STRING, //代理人
    agentCompany: Sequelize.STRING, //代理人所在公司
    agentContact: Sequelize.STRING, //代理人联系方式
}, {
        freezeTableName: true // Model tableName will be the same as the model name
    })

export default Agent