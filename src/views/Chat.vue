<script setup>
	import { ref, onBeforeUnmount } from "vue"
	import { getAuth } from "firebase/auth"
	import { useRoute } from "vue-router"
	import {
		getFirestore,
		collection,
		onSnapshot,
		addDoc,
		query,
		orderBy,
		serverTimestamp,
		doc,
		deleteDoc
	} from "firebase/firestore"

	const route = useRoute()
	const { uid, photoURL } = getAuth().currentUser
	const messages = ref([])
	const text = ref("")

	let add = e => {
		addDoc(collection(getFirestore(), `chats/${route.params.id}/messages`), {
			uid,
			photoURL,
			text: text.value,
			timestamp: serverTimestamp()
		}).then(() => text.value = "")
	}

	let remove = message => {
		deleteDoc(doc(getFirestore(), `chats/${route.params.id}/messages/${message.id}`))
	}

	onBeforeUnmount(onSnapshot(
		query(
			collection(getFirestore(), `chats/${route.params.id}/messages`),
			orderBy("timestamp")
		),
		snapshot => messages.value = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		}))
	))
</script>

<template>
	<div class="p-4 flex flex-col gap-4 overflow-auto">
		<div v-for="(message, index) in messages" class="flex items-center gap-4" :class="{ 'flex-row-reverse': message.uid == uid }">
			<img :src="message.photoURL" @click="remove(message)" class="avatar">
			<div class="p-4 rounded-lg max-w-[50%]" :class="message.uid == uid ? 'bg-blue-400 text-white' : 'bg-gray-100'">{{ message.text }}</div>
		</div>
	</div>
	<div class="p-4 border-t">
		<form @submit.prevent="add" class="bg-gray-100 border px-4 py-2 rounded-full text-gray-400 flex gap-4">
			<input class="flex-1 bg-transparent outline-none" placeholder="Type a message" v-model.trim="text" required>
			<button>Send</button>
		</form>
	</div>
</template>