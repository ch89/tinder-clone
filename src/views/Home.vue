<script setup>
	import Card from "../components/Card.vue"
	import Match from "../components/Match.vue"
	import { ref } from "vue"
	import {
		getFirestore,
		collection,
		getDocs,
		query,
		where,
		doc,
		setDoc,
		getDoc,
		addDoc,
		serverTimestamp
	} from "firebase/firestore"
	import { getAuth } from "firebase/auth"

	const { uid } = getAuth().currentUser
	const cards = ref(null)
	const name = ref(null)
	const show = ref(false)
	const card = ref({})

	let swipe = status => {
		name.value = status
		card.value = cards.value.pop()

		setDoc(doc(getFirestore(), `users/${uid}/${status}/${card.value.uid}`), card.value)
	}

	let like = e => {
		getDoc(doc(getFirestore(), `users/${card.value.uid}/like/${uid}`))
			.then(snapshot => {
				if(snapshot.exists()) {
					show.value = true

					addDoc(collection(getFirestore(), "chats"), {
						uids: [uid, card.value.uid],
						timestamp: serverTimestamp()
					})
				}
			})
			.catch(error => alert(error.message))
			.finally(() => name.value = null)
	}

	let nope = e => name.value = null

	getDocs(collection(getFirestore(), `users/${uid}/like`))
		.then(snapshot => {
			const uids = snapshot.docs.map(doc => doc.id)

			return getDocs(query(
				collection(getFirestore(), "users"),
				where("uid", "not-in", [uid, ...uids])
			))
		})
		.then(snapshot => cards.value = snapshot.docs.map(doc => doc.data()))
</script>

<template>
	<transition-group tag="div" :name="name" @after-leave="this[name]()" class="relative">
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
	<match v-show="show" @close="show = false" :card="card"></match>
</template>

<style scoped>
	.nope-leave-to {
		@apply !-translate-x-[120%] !-rotate-12;
	}

	.like-leave-to {
		@apply !translate-x-[120%] !rotate-12;
	}
</style>