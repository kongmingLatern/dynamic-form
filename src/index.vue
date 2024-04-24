<template>
	<n-message-provider>
		<DynamicForm :config="formCfg">
			<template #action="{ submit }">
				<NButton @click="e => handleSubmit(e, submit)"
					>提交</NButton
				>
			</template>
		</DynamicForm>

		<n-button @click="handleClick">按钮1</n-button>
		<n-button @click="handleClick">按钮2</n-button>
	</n-message-provider>
</template>

<script setup lang="ts">
import DynamicForm from '@/components/DynamicForm.vue'
import FormCreate from './components/FormCreate.vue'
import { useDrawer } from '@/composables'
import { NButton } from 'naive-ui'
import { h, provide, ref } from 'vue'

const drawer = useDrawer()

const formCfg = ref({
	formItem: [
		{
			type: 'input',
			path: 'username',
			label: '用户名',
			placeholder: '请输入用户名',
		},
		{
			type: 'select',
			path: 'name',
			multiple: true,
			label: '名称',
			placeholder: '请选择性别',
			options: [
				{
					label: '财务部',
					value: '123',
				},
				{
					label: '阿婕',
					value: '1234',
				},
				{
					label: '阿婕',
					value: '1123123',
				},
			],
		},
	],
})

const targetValue = [
	{
		name: '123',
	},
	{
		name: '1234',
	},
	{
		name: '1123123',
	},
]

const formValue = ref({
	name: targetValue.map(i => i.name),
})

provide('formValue', formValue)

const handleClick = () => {
	drawer.create({
		drawerProps: {
			width: 500,
		},
		header: '表单',
		content: () =>
			h(
				'div',
				{},
				{
					default: () => [
						h(
							DynamicForm,
							{
								config,
							},
							{
								default: () => null,
							}
						),
						h(
							NButton,
							{
								onClick: handleClick,
							},
							{
								default: () => 'click',
							}
						),
					],
				}
			),
	})
}

const config = {
	formItem: [
		{
			type: 'input',
			path: 'user.name',
			label: '姓名',
			placeholder: '输入姓名',
		},
		{
			type: 'number',
			path: 'user.age',
			label: '年龄',
			placeholder: '输入年龄',
		},
		{
			type: 'input',
			path: 'phone',
			label: '电话号码',
			placeholder: '电话号码',
		},
		{
			type: 'input',
			path: 'address',
			label: '地址',
			placeholder: '地址',
			formItem: [
				{
					path: 'address.province',
					label: '省份',
					placeholder: '省份',
				},
				{
					path: 'address.city',
					label: '城市',
					placeholder: '城市',
				},
			],
		},
	],
}

function handleSubmit(e, submit) {
	submit(e)
	console.log(formValue.value)
}
</script>
