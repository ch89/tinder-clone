<script setup>
	import Navbar from "./components/Navbar.vue"
	import Login from "./components/Login.vue"
	import { useStore } from "vuex"
	import { getAuth, onAuthStateChanged } from "firebase/auth"
	import { getFirestore, doc, setDoc } from "firebase/firestore"

	const store = useStore()

	onAuthStateChanged(getAuth(), user => {
		if(user) {
			setDoc(doc(getFirestore(), `users/${user.uid}`), {
				id: user.uid,
				name: user.displayName,
				photo: user.photoURL,
				age: 33
			})
		}

		store.commit("auth", user)
	})
</script>

<template>
	<template v-if="store.state.user">
		<navbar></navbar>
		<router-view></router-view>
	</template>
	<login v-else></login>
</template>

<style>
	.tinder-btn {
		@apply bg-gradient-to-r from-[#FD297B] to-[#FF655B] px-4 py-2 rounded-lg text-white font-semibold;
	}
</style>