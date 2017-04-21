import * as urllib from 'urllib'
import City from '../models/city'
import db from '../db'

let fetch_city = async function() {
	await db.sync({
		force: false
	});
	let datas = await urllib.request('http://web.chelaile.net.cn/cdatasource/citylist?type=allRealtimeCity&s=h5&v=3.3.9&src=webapp_weix%E2%80%A6&userId=browser_1492765244104&cityId=061', {
		dataType: 'json'
	})
	let cities = datas.data.data.allRealtimeCity
	let promises = []
	for(let city of cities) {
		await City.create(city)
	}

	console.log('完成')
}

fetch_city().catch(function(err) {
	console.log('错误:', err)
})