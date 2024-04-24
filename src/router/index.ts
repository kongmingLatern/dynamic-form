import {
	createRouter,
	createWebHashHistory,
} from 'vue-router'

export const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: '/index',
			component: () => import('@/App.vue'),
			children: [],
		},
		{
			path: '/index',
			name: 'index',
			component: () => import('@/index.vue'),
		},
		{
			path: '/form',
			name: 'Form',
			component: () =>
				import('@/components/FormCreate.vue'),
		},
	],
})
