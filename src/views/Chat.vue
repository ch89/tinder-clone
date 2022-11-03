<script setup>
	import { ref } from "vue"
	import { getAuth } from "firebase/auth"

	const { uid, photoURL } = getAuth().currentUser
	const messages = ref([
		{ uid: 1, photoURL: "/images/cat1.jpg", text: "Hi! How are you?" }
	])
	const text = ref("")

	let add = e => {
		messages.value.push({
			uid,
			photoURL,
			text: text.value
		})

		text.value = ""
	}
</script>

<template>
	<div class="p-4 flex flex-col gap-4 overflow-auto">
		<div v-for="(message, index) in messages" class="flex items-center gap-4" :class="{ 'flex-row-reverse': message.uid == uid }">
			<img :src="message.photoURL" @click="messages.splice(index, 1)" class="avatar">
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