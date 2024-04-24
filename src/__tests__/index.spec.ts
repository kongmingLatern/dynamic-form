import {
	getNestValue,
	handleRuleByType,
	setNestValue,
} from '@/utils'

describe('getNestValue', () => {
	it('should get value at a shallow level in the object', () => {
		const formValue = { key: 'value' }
		const path = 'key'
		expect(getNestValue(formValue, path)).toEqual('value')
	})

	it('should get value at a deep level in the object', () => {
		const formValue = { key1: { key2: 'value' } }
		const path = 'key1.key2'
		expect(getNestValue(formValue, path)).toEqual('value')
	})

	it('should return undefined for a value that does not exist in the object', () => {
		const formValue = { key1: { key2: 'value' } }
		const path = 'key1.key3'
		expect(getNestValue(formValue, path)).toEqual('')
	})
})

describe('setNestValue', () => {
	it('should set a value at a shallow level in the object', () => {
		const formValue: any = { key: 'value' }
		const path = 'newKey'
		const value = 'newValue'
		setNestValue(formValue, path, value)
		expect(formValue.newKey).toEqual('newValue')
	})

	it('should set a value at a deep level in the object', () => {
		const formValue: any = { key1: { key2: 'value' } }
		const path = 'key1.key3'
		const value = 'newValue'
		setNestValue(formValue, path, value)
		expect(formValue.key1.key3).toEqual('newValue')
	})
})

describe('handleRuleByType', () => {
	it('should return an empty object for an empty formItem array', () => {
		const formItem: any = []
		const result = handleRuleByType(formItem)
		expect(result).toEqual({})
	})

	it('should generate the correct validation rules for a formItem with a single item', () => {
		const formItem = [
			{
				path: 'username',
				required: true,
				label: 'Username',
			},
		]
		const result = handleRuleByType(formItem)
		expect(result).toEqual({
			username: {
				required: true,
				message: '请输入Username',
				trigger: ['input', 'blur'],
			},
		})
	})

	it('should generate the correct validation rules for a formItem with multiple items', () => {
		const formItem = [
			{
				path: 'username',
				required: true,
				label: 'Username',
			},
			{
				path: 'password',
				required: true,
				label: 'Password',
			},
		]
		const result = handleRuleByType(formItem)
		expect(result).toEqual({
			username: {
				required: true,
				message: '请输入Username',
				trigger: ['input', 'blur'],
			},
			password: {
				required: true,
				message: '请输入Password',
				trigger: ['input', 'blur'],
			},
		})
	})

	it('should generate correct validation rules for nest formItem', () => {
		const formItem = [
			{
				path: 'user.name',
				required: true,
				label: 'Name',
			},
			{
				path: 'user.age',
				required: true,
				label: 'Age',
			},
		]
		const result = handleRuleByType(formItem)
		expect(result).toEqual({
			user: {
				name: {
					required: true,
					message: '请输入Name',
					trigger: ['input', 'blur'],
				},
				age: {
					required: true,
					message: '请输入Age',
					trigger: ['input', 'blur'],
				},
			},
		})
	})
})
