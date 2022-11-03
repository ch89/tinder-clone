<script setup>
	import { getAuth } from "firebase/auth"

	const { photoURL } = getAuth().currentUser

	defineProps(["card"])
</script>

<template>
	<transition enter-from-class="opacity-0" leave-to-class="opacity-0">
		<div class="absolute inset-0 z-10 bg-black/50 backdrop-blur-sm grid grid-cols-2 content-center gap-8 px-8 transition select-none">
			<img src="/images/match.webp" class="col-span-2">
			<p class="col-span-2 text-white text-center">You and {{ card.displayName }} have liked each other!</p>
			<img class="w-full aspect-square object-cover rounded-full border-4 border-white" :src="photoURL">
			<img class="w-full aspect-square object-cover rounded-full border-4 border-white" :src="card.photoURL">
			<button @click="$emit('close')" class="tinder-btn col-span-2">Send Message</button>
		</div>
	</transition>
</template>