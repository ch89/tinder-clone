<script setup>
	import Card from "../components/Card.vue"
	import { ref, reactive } from "vue"
	import { useStore } from "vuex"
	import {
		getFirestore,
		collection,
		getDocs,
		doc,
		setDoc
	} from "firebase/firestore"

	let cards = ref([]),
		card = ref({}),
		status = ref(""),
		disabled = ref(false),
		db = getFirestore(),
		store = useStore()

	let swipe = value => {
		card.value = cards.value.pop()
		status.value = value
		disabled.value = true

		setDoc(doc(db, `users/${store.state.user.uid}/${value}/${card.value.id}`), {
			name: card.value.name
		})
	}

	getDocs(collection(db, "users")).then(snapshot => {
		cards.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
	})
</script>

<template>
	<transition-group class="relative" tag="div" :name="status" @after-leave="disabled = false">
		<card v-for="card in cards" :key="card.id" :card="card" @swipe="swipe"></card>
	</transition-group>
	<div class="flex justify-between p-4 border-t">
		<button class="btn text-[#f5b748]">
			<i class="fa-solid fa-reply"></i>
		</button>
		<button class="btn text-[#ec5e6f]" @click="swipe('nope')" :disabled="disabled">
			<i class="fa-solid fa-times"></i>
		</button>
		<button class="btn text-[#62b4f9]">
			<i class="fa-solid fa-star"></i>
		</button>
		<button class="btn text-[#76e2b3]" @click="swipe('like')" :disabled="disabled">
			<i class="fa-solid fa-heart"></i>
		</button>
		<button class="btn text-[#915dd1]">
			<i class="fa-solid fa-bolt"></i>
		</button>
	</div>
</template>

<style scoped>
	.btn {
		@apply w-12 h-12 shadow-md rounded-full text-2xl;
	}

	.like-leave-to {
		@apply !translate-x-full !rotate-12;
	}

	.nope-leave-to {
		@apply !-translate-x-full !-rotate-12;
	}
</style>