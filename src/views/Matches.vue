<script setup>
	import {
		getFirestore,
		collection,
		onSnapshot
	} from "firebase/firestore"
	import { ref } from "vue"

	const users = ref([])

	onSnapshot(
		collection(getFirestore(), "users"),
		snapshot => users.value = snapshot.docs.map(doc => doc.data())
	)
</script>

<template>
	<div>
		<router-link to="/chat" v-for="user in users" :key="user.uid" class="p-4 border-b flex items-center gap-4">
			<img :src="user.photoURL" class="avatar">
			<div>
				<h3 class="font-bold">{{ user.displayName }}</h3>
				<p class="text-sm text-gray-400">2 hours ago</p>
			</div>
			<i class="fa-solid fa-heart ml-auto text-[#76e2b3]"></i>
		</router-link>
	</div>
</template>