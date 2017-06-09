import db from '../../rent_db'
import Sequelize from 'sequelize'

let House = db.define('hourse', {
    address: Sequelize.STRING, //详细地址,如好世樱园(3588弄)
    desc: Sequelize.STRING, //详情
    room: Sequelize.STRING, //户型
    shi: Sequelize.STRING, //室
    ting: Sequelize.STRING, //厅
    wei: Sequelize.STRING, //卫
    url: Sequelize.STRING, //链接地址
    rent_type: Sequelize.STRING, //租赁方式,整租/单租
    floor: Sequelize.STRING, //楼层
    totalFloor: Sequelize.STRING, //总楼层
    toward: Sequelize.STRING, //朝向
    district: Sequelize.STRING, //小区
    busi_district: Sequelize.STRING, //商圈
    pay_type: Sequelize.STRING, //付款方式,押一付三
    size: Sequelize.STRING, //面积
    price: Sequelize.STRING, //房租
    fittype: Sequelize.STRING, //装修
}, {
        freezeTableName: true // Model tableName will be the same as the model name
    })

export default House