<script setup>
	import { ref } from "vue"
	import { useStore } from "vuex"
	import {
		getFirestore,
		collection,
		query,
		where,
		getDocs
	} from "firebase/firestore"

	const store = useStore()

	const q = query(
		collection(getFirestore(), "users"), 
		where("id", "!=", store.state.user.uid)
	)

	// getDocs(q).then(snapshot => matches.value = snapshot.docs.map(doc => doc.data()))

	getDocs(q).then(snapshot => {
		store.commit("getMatches", snapshot.docs.map(doc => doc.data()))
	})
</script>

<template>
	<div>
		<router-link :to="{ name: 'chat', params: { id: match.id } }" v-for="match in store.state.matches" :key="match.id" class="flex items-center p-4 border-b">
			<img :src="match.photo" alt="Photo" class="w-12 h-12 object-cover rounded-full mr-4">
			<div>
				<h3 class="font-bold">{{ match.name }}</h3>
				<p class="text-sm text-gray-400">2 hours ago</p>
			</div>
			<i class="fa-solid fa-heart ml-auto text-[#76e2b3]"></i>
		</router-link>
	</div>
</template>