import App from './App.vue'
import FcDesigner from 'form-designer-naiveui'
import NaiveUI from 'naive-ui'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import formCreate from '@form-create/naive-ui'
import { router } from './router'

const app = createApp(App)
app
	.use(formCreate)
	.use(FcDesigner)
	.use(router)
	.use(NaiveUI)
	.use(createPinia())
	.mount('#app')
