<script setup>
	import { useStore } from "vuex"
	import { getAuth, signOut } from "firebase/auth"

	const store = useStore()

	const emit = defineEmits(["close"])
</script>

<template>
	<transition>
		<div class="absolute inset-0 z-10 bg-black/30 backdrop-blur-sm grid place-items-center transition" @click.self="emit('close')">
			<div class="bg-white p-4 rounded-xl flex flex-col items-center gap-4 transition">
				<img src="/images/tinder.png" alt="Logo" class="w-32">
				<p>Welcome {{ store.state.user.displayName }}</p>
				<img :src="store.state.user.photoURL" alt="Avatar" class="rounded-full">
				<button class="tinder-btn" @click="signOut(getAuth())">Logout</button>
			</div>
		</div>
	</transition>
</template>

<style scoped>
	.v-enter-from, .v-leave-to {
		opacity: 0;
	}
	
	.v-enter-from .bg-white, .v-leave-to .bg-white {
		transform: scale(1.1);
	}
</style>