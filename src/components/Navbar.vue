<script setup>
	import { getAuth, signOut } from "firebase/auth"

	const { photoURL } = getAuth().currentUser
</script>

<template>
	<nav class="p-4 border-b flex items-center justify-between">
		<button>
			<img :src="photoURL" @click="signOut(getAuth())" class="w-8 h-8 rounded-full object-cover">
		</button>
		<img src="/images/logo.png" class="h-8">
		<button class="text-2xl text-gray-300">
			<i class="fa-solid fa-comment"></i>
		</button>
	</nav>
</template>