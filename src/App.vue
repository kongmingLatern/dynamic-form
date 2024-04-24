<template>
	<n-message-provider>
		<message />
	</n-message-provider>

	<n-message-provider>
		<RouterView />
	</n-message-provider>
</template>

<script setup lang="ts">
import message from './message.vue'
</script>

<style scoped></style>
