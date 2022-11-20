<script setup>
	import {
		getFirestore,
		collection,
		getDocs,
		query,
		where
	} from "firebase/firestore"
	import { getAuth } from "firebase/auth"
	import { ref } from "vue"

	const { uid } = getAuth().currentUser
	const matches = ref([])

	getDocs(query(
		collection(getFirestore(), "chats"),
		where("uids", "array-contains", uid)
	)).then(snapshot => matches.value = snapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data()
	})))
</script>

<template>
	<div>
		<router-link :to="{ name: 'chat', params: { id: match.id } }" v-for="match in matches" :key="match.id" class="p-4 border-b flex items-center gap-4">
			<!-- <img :src="user.photoURL" class="avatar"> -->
			<img src="/images/cat1.jpg" class="avatar">
			<div>
				<!-- <h3 class="font-bold">{{ user.displayName }}</h3> -->
				<h3 class="font-bold">Username</h3>
				<p class="text-sm text-gray-400">2 hours ago</p>
			</div>
			<i class="fa-solid fa-heart ml-auto text-[#76e2b3]"></i>
		</router-link>
	</div>
</template>