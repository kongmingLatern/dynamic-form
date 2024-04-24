import { NDrawer, NDrawerContent } from 'naive-ui'
import { createApp, defineComponent, ref } from 'vue'

import Naive from 'naive-ui'
import { defineStore } from 'pinia'

export const useDrawer = defineStore('drawer', () => {
	let app: any

	function create(config: any) {
		// 创建naiveui抽屉组件
		const drawer = ref(false)

		const { drawerProps } = config

		const drawerComponent = defineComponent({
			setup() {
				return () => (
					<NDrawer
						v-model:show={drawer.value}
						onMaskClick={() => {
							close()
						}}
						{...drawerProps}
					>
						<NDrawerContent
							v-slots={{
								header: () => config.header,
								default: () => config.content(),
							}}
						/>
					</NDrawer>
				)
			},
		})

		const container = document.createElement('div')
		// 渲染抽屉组件
		app = createApp(drawerComponent)
		app.use(Naive)

		app.mount(container)
		drawer.value = true

		return {
			drawer,
			drawerComponent,
		}
	}

	function close() {
		// 卸载抽屉组件
		setTimeout(() => {
			app.unmount()
		}, 300)
	}

	return {
		create,
		close,
	}
})
