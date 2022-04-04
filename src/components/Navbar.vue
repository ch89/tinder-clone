<script setup>
	import Modal from "./Modal.vue"
	import { ref } from "vue"
	import { useStore } from "vuex"

	const store = useStore()

	let show = ref(false)
</script>

<template>
	<nav class="flex items-center justify-between p-4 border-b">
		<button @click="show = true">
			<img :src="store.state.user.photoURL" alt="Avatar" class="w-8 h-8 object-cover rounded-full">
		</button>
		<router-link to="/">
			<img src="/images/logo.png" alt="Logo" class="h-10">
		</router-link>
		<router-link to="/matches" class="text-2xl text-gray-300">
			<i class="fa-solid fa-comment"></i>
		</router-link>
	</nav>
	<modal v-show="show" @close="show = false"></modal>
</template>