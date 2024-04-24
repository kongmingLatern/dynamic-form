<template>
	<fc-designer ref="designer" style="height: 100dvh" />
	<!-- <form-create
		:rule="rule"
		v-model:api="fApi"
		:option="options"
		v-model="value"
	/> -->
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
const designer = ref<any>(null)

onMounted(() => {
	console.log(designer.value)
})

const fApi = ref<any>(null)
const value = ref({
	field1: 'aaa',
	field2: 'sss',
	time: '12:12:12',
})

const rule = [
	{
		type: 'input',
		field: 'field1',
		title: 'field1',
		value: 'aaa',
	},
	{
		type: 'input',
		field: 'field2',
		title: 'field2',
		value: 'sss',
	},
	{
		type: 'timePicker',
		field: 'time',
		title: 'time',
		value: '12:12:12',
	},
	{
		type: 'ElButton',
		title: '修改 field1',
		native: false,
		on: {
			click: () => {
				this.rule[0].value += 'a'
			},
		},
		children: ['点击'],
	},
]

const options = {
	onSubmit: formData => {
		alert(JSON.stringify(formData))
	},
}
</script>

<style scoped></style>
