import {test} from '../interfaces/interface'
import {getJSON} from '../utils/jsonUtil'
import { _debug_mocha } from '../utils/debugUtil'

import {expect} from 'chai'
import "mocha"

describe('interface', ()=> {
	it('case1', ()=> {
		let ret = test()
		expect(ret).to.equal('Hello World')
	})
	it.only('getJSON', () => {
		_debug_mocha('开始')
		_debug_mocha(getJSON(null))
	})
})