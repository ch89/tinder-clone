<script setup>
	import Card from "../components/Card.vue"
	import { ref } from "vue"
	import {
		getFirestore,
		collection,
		getDocs,
		query,
		where
	} from "firebase/firestore"
	import { getAuth } from "firebase/auth"

	// const cards = ref([
	// 	{ id: 1, name: "Misse", age: 3, photo: "/images/cat1.jpg" },
	// 	{ id: 2, name: "Fluffy", age: 7, photo: "/images/cat2.jpg" },
	// 	{ id: 3, name: "Pelle", age: 5, photo: "/images/cat3.jpg" },
	// 	{ id: 4, name: "Kissen", age: 12, photo: "/images/cat4.jpg" },
	// 	{ id: 5, name: "Molly", age: 9, photo: "/images/cat5.jpg" },
	// ])
	const { uid } = getAuth().currentUser
	const cards = ref(null)
	const name = ref(null)

	let swipe = status => {
		name.value = status
		cards.value.pop()
	}

	getDocs(query(
		collection(getFirestore(), "users"),
		where("uid", "!=", uid)
	)).then(snapshot => cards.value = snapshot.docs.map(doc => doc.data()))
</script>

<template>
	<transition-group tag="div" :name="name" @after-leave="name = null" class="relative">
		<div key="empty" class="grid place-items-center h-full text-gray-300">
			<i class="fa-solid fa-smile text-[10rem]"></i>
			<p>No more swipes today!</p>
		</div>
		<card v-for="card in cards" :key="card.uid" :card="card" @swipe="swipe"></card>
	</transition-group>
	<div class="p-4 border-t flex justify-between text-xl">
		<button class="w-12 h-12 shadow-md rounded-full text-[#f5b748]">
			<i class="fa-solid fa-reply"></i>
		</button>
		<button @click="swipe('nope')" :disabled="name" class="w-12 h-12 shadow-md rounded-full text-[#ec5e6f]">
			<i class="fa-solid fa-xmark"></i>
		</button>
		<button class="w-12 h-12 shadow-md rounded-full text-[#62b4f9]">
			<i class="fa-solid fa-star"></i>
		</button>
		<button @click="swipe('like')" :disabled="name" class="w-12 h-12 shadow-md rounded-full text-[#76e2b3]">
			<i class="fa-solid fa-heart"></i>
		</button>
		<button class="w-12 h-12 shadow-md rounded-full text-[#915dd1]">
			<i class="fa-solid fa-bolt"></i>
		</button>
	</div>
</template>

<style scoped>
	.nope-leave-to {
		@apply !-translate-x-[120%] !-rotate-12;
	}

	.like-leave-to {
		@apply !translate-x-[120%] !rotate-12;
	}
</style>