export function getNestValue(
	formValue: any,
	path: string,
	initialValue: any = ''
) {
	// path 可能是多层
	const paths = path.split('.')
	let value = formValue
	for (let i = 0; i < paths.length; i++) {
		value = value[paths[i]] || initialValue
	}
	return value
}

export function setNestValue(
	formValue: any,
	path: string,
	value: any
) {
	// path 可能是多层
	const paths = path.split('.')
	let obj = formValue
	for (let i = 0; i < paths.length - 1; i++) {
		if (!obj[paths[i]]) {
			obj[paths[i]] = {}
		}
		obj = obj[paths[i]]
	}
	obj[paths[paths.length - 1]] = value
}

export function handleRuleByType(formItem: any[]) {
	// 根据 formItem 的 path 生成对应的校验规则
	return formItem.reduce((acc, item) => {
		setNestValue(acc, item.path, {
			required: item?.required ?? true,
			message: item?.message ?? `请输入${item?.label}`,
			trigger: item?.trigger ?? ['input', 'blur'],
		})

		if (item?.type === 'number') {
			setNestValue(acc, item.path, {
				...acc[item.path],
				type: 'number',
			})
		}

		return acc
	}, {})
}
