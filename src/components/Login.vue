<script setup>
	import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
</script>

<template>
	<div class="grid place-items-center h-screen">
		<img src="/images/tinder.png" alt="Logo" class="w-64">
		<form @submit.prevent="signInWithPopup(getAuth(), new GoogleAuthProvider())" class="grid grid-cols-2 gap-4">
			<input class="tinder-input" placeholder="Email">
			<input class="tinder-input" placeholder="Password">
			<button class="tinder-btn">Sign in</button>
			<button class="tinder-btn">Sign up</button>
		</form>
	</div>
</template>

<style scoped>
	.tinder-input {
		@apply bg-gray-100 border rounded-lg px-4 py-2 col-span-2 focus:outline-none;
	}
</style>