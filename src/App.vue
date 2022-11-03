<script setup>
	import Navbar from "./components/Navbar.vue"
	import {
		getAuth,
		onAuthStateChanged,
		signInWithPopup,
		GoogleAuthProvider,
		getAdditionalUserInfo
	} from "firebase/auth"
	import {
		getFirestore,
		doc,
		setDoc
	} from "firebase/firestore"
	import { ref } from "vue"

	const user = ref(null)

	let login = async e => {
		const cred = await signInWithPopup(getAuth(), new GoogleAuthProvider)

		if(getAdditionalUserInfo(cred).isNewUser) {
			console.log("New user =)")

			const { uid, displayName, photoURL } = cred.user

			setDoc(doc(getFirestore(), `users/${uid}`), { uid, displayName, photoURL })
		}
		else {
			console.log("Old user =(")
		}
	}

	onAuthStateChanged(getAuth(), u => user.value = u)
</script>

<template>
	<main v-if="user" class="grid grid-rows-[auto_1fr] h-full text-gray-700 overflow-hidden relative">
		<navbar></navbar>
		<router-view></router-view>
	</main>
	<div v-else class="grid place-items-center h-full">
		<img src="/images/tinder.png" class="w-64">
		<button @click="login" class="tinder-btn">Login</button>
	</div>
</template>

<style>
	.tinder-btn {
		@apply bg-gradient-to-r from-[#FD297B] to-[#FF655B] px-4 py-2 rounded-lg font-bold text-white;
	}

	.avatar {
		@apply w-12 h-12 rounded-full object-cover;
	}
</style>