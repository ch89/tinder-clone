<script setup>
	import { getAuth, signOut } from "firebase/auth"
	import {
		getFirestore,
		collection,
		onSnapshot
	} from "firebase/firestore"
	import { ref } from "vue"

	const { uid, photoURL } = getAuth().currentUser
	const matches = ref([])
	const audio = new Audio("/sounds/match.mp3")
</script>

<template>
	<nav class="p-4 border-b flex items-center justify-between">
		<button>
			<img :src="photoURL" @click="signOut(getAuth())" class="w-8 h-8 rounded-full object-cover">
		</button>
		<router-link to="/">
			<img src="/images/logo.png" class="h-8">
		</router-link>
		<router-link to="/matches" class="text-2xl text-gray-300 relative">
			<div v-show="matches.length" class="absolute -top-2 -right-2 bg-red-400 text-white w-5 h-5 rounded-full text-xs grid place-items-center">{{ matches.length }}</div>
			<i class="fa-solid fa-comment"></i>
		</router-link>
	</nav>
</template>