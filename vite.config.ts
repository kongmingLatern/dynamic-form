import { defineConfig } from 'vitest/config'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
	},
	plugins: [vue(), vueJsx()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
