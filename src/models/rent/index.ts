import rent_db from '../../rent_db'
import Agent from './agent'
import Area from './area'
import City from './city'
import House from './house'
Area.belongsTo(City)
Area.hasMany(House)
Agent.hasMany(House)
export {
	rent_db,
	Agent,
	Area,
	City,
	House
}