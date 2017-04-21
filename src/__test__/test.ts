import {test} from '../interfaces/interface'

import {expect} from 'chai'
import "mocha"

describe('interface', ()=> {
	it('case1', ()=> {
		let ret = test()
		expect(ret).to.equal('Hello World')
	})
})