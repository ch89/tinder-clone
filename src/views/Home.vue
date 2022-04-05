<script setup>
	import Card from "../components/Card.vue"
	import Match from "../components/Match.vue"
	import { ref, reactive } from "vue"
	import { useStore } from "vuex"
	import {
		getFirestore,
		collection,
		getDocs,
		doc,
		setDoc,
		query,
		where,
		getDoc
	} from "firebase/firestore"

	let cards = ref([]),
		card = ref({}),
		status = ref(""),
		disabled = ref(false),
		show = ref(false),
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

	let check = e => {
		if(status.value == "like") {
			getDoc(doc(db, `users/${card.value.id}/like/${store.state.user.uid}`))
				.then(snapshot => show.value = snapshot.exists())
				.catch(error => alert(error.message))
				.finally(() => disabled.value = false)
		}
		else {
			disabled.value = false
		}
	}

	const q = query(collection(db, "users"), where("id", "!=", store.state.user.uid))

	getDocs(q).then(snapshot => {
		cards.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
	})
</script>

<template>
	<transition-group class="relative" tag="div" :name="status" @after-leave="check">
		<card v-for="card in cards" :key="card.id" :card="card" @swipe="swipe"></card>
	</transition-group>
	<div class="flex justify-between p-4 border-t">
		<button class="btn text-[#f5b748]">
			<i class="fa-solid fa-reply"></i>
		</button>
		<button class="btn text-[#ec5e6f]" @click="cards.length ? swipe('nope') : null" :disabled="disabled">
			<i class="fa-solid fa-times"></i>
		</button>
		<button class="btn text-[#62b4f9]">
			<i class="fa-solid fa-star"></i>
		</button>
		<button class="btn text-[#76e2b3]" @click="cards.length ? swipe('like') : null" :disabled="disabled">
			<i class="fa-solid fa-heart"></i>
		</button>
		<button class="btn text-[#915dd1]">
			<i class="fa-solid fa-bolt"></i>
		</button>
	</div>
	<match v-show="show" :card="card" @close="show = false"></match>
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