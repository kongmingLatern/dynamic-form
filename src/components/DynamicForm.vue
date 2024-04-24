<template>
	<n-form
		ref="formRef"
		:label-width="80"
		label-placement="left"
		:model="formValue"
		:rules="rules"
		:size="size"
	>
		<template v-for="item in $props.config?.formItem">
			<n-form-item :label="item.label" :path="item.path">
				<n-input
					v-if="item.type === 'input'"
					:value="getNestValue(formValue, item.path)"
					:on-update-value="
						val => setNestValue(formValue, item.path, val)
					"
					:placeholder="item.placeholder"
					v-bind="item.bindOptions"
				/>

				<n-input-number
					v-if="item.type === 'number'"
					:value="getNestValue(formValue, item.path, 0)"
					:on-update-value="
						val => setNestValue(formValue, item.path, val)
					"
					:placeholder="item.placeholder"
					v-bind="item.bindOptions"
				/>

				<n-select
					v-else-if="item.type === 'select'"
					:value="getNestValue(formValue, item.path)"
					:on-update-value="
						val => setNestValue(formValue, item.path, val)
					"
					:multiple="item.multiple"
					:placeholder="item.placeholder"
					:options="item.options"
					v-bind="item.bindOptions"
				/>

				<n-radio
					v-else-if="item.type === 'radio'"
					:checked="getNestValue(formValue, item.path)"
					:on-update-checked="
						val => setNestValue(formValue, item.path, val)
					"
				/>

				<n-date-picker
					v-else-if="item.type === 'date'"
					:value="getNestValue(formValue, item.path)"
					:on-update-value="
						val => setNestValue(formValue, item.path, val)
					"
					type="datetime"
				/>
			</n-form-item>
		</template>

		<slot name="action" :submit="handleValidateClick">
			<n-form-item>
				<n-button
					attr-type="button"
					@click="handleValidateClick"
				>
					验证
				</n-button>
			</n-form-item>
		</slot>
	</n-form>

	<pre
		>{{ JSON.stringify(formValue, null, 2) }}
</pre
	>

	<NButton @click="$router.push('/form')">表单设计</NButton>
</template>

<script setup lang="ts">
import { FormInst } from 'naive-ui'
import {
	getNestValue,
	handleRuleByType,
	setNestValue,
} from '@/utils'
import { inject, ref } from 'vue'

const props = defineProps({
	config: {
		type: Object,
	},
})

const formRef = ref<FormInst | null>(null)
const size = ref<'small' | 'medium' | 'large'>('medium')

const formValue = inject('formValue') || ref({})

console.log(formValue.value)

const rules = handleRuleByType(props.config?.formItem)

const handleValidateClick = (e: MouseEvent) => {
	e.preventDefault()
	formRef.value?.validate(errors => {
		if (!errors) {
			window.$message.success('Valid')
		} else {
			console.log(errors)
			window.$message.error('Invalid')
		}
	})
}
</script>
