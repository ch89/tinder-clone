<script setup>
	import { ref } from "vue"
	import { useStore } from "vuex"

	defineProps(["card"])
	const emit = defineEmits(["close"])

	const store = useStore()
</script>

<template>
	<transition enter-from-class="opacity-0" leave-to-class="opacity-0">
		<div class="absolute inset-0 bg-black/50 backdrop-blur-sm px-8 text-center grid grid-cols-2 gap-8 content-center transition" @click.self="emit('close')">
			<img src="/images/match.webp" alt="Match" class="col-span-2">
			<p class="text-white col-span-2">You and {{ card.name }} have liked each other.</p>
			<img :src="store.state.user.photoURL" alt="Avatar" class="w-full aspect-square object-cover rounded-full border-4 border-white">
			<img :src="card.photo" alt="Avatar" class="w-full aspect-square object-cover rounded-full border-4 border-white">
			<router-link to="/matches" class="tinder-btn col-span-2">Send Message</router-link>
		</div>
	</transition>
</template>