<script setup>
	import { ref, computed, reactive } from "vue"
	import { useRoute, useRouter } from "vue-router"
	import { useStore } from "vuex"

	const route = useRoute()
	const router = useRouter()
	const store = useStore()

	const match = computed(() => store.state.matches.find(match => match.id == route.params.id))

	let messages = reactive([
		{
			id: 1,
			name: match.value.name,
			photo: match.value.photo,
			content: "Hi! How are you?"
		},
		{
			id: 2,
			name: store.state.user.displayName,
			photo: store.state.user.photoURL,
			content: "Hey! I am fine thanks! =)"
		}
	])

	let message = ref("")

	let add = e => {
		messages.push({
			id: messages.length + 1,
			name: store.state.user.displayName,
			photo: store.state.user.photoURL,
			content: message.value
		})

		message.value = ""
	}
</script>

<template>
	<div class="p-4 flex flex-col gap-4 overflow-auto">
		<div v-for="message in messages" :key="message.id" class="flex items-center gap-4" :class="{ 'flex-row-reverse': message.name == store.state.user.displayName }">
			<img :src="message.photo" alt="Photo" class="w-12 h-12 object-cover rounded-full">
			<div class="p-4 rounded-lg max-w-[50%]" :class="message.name == store.state.user.displayName ? 'bg-blue-400 text-white' : 'bg-gray-100'">{{ message.content }}</div>
		</div>
	</div>
	<form class="flex gap-4 p-4 border-t" @submit.prevent="add">
		<button class="bg-green-400 text-white w-10 h-10 rounded-full" type="button">
			<i class="fa-solid fa-face-smile"></i>
		</button>
		<div class="bg-gray-100 border rounded-full px-4 flex gap-4 flex-1 text-gray-400">
			<input placeholder="Type a message" class="flex-1 bg-transparent focus:outline-none" v-model.trim="message">
			<button :disabled="! message">Send</button>
		</div>
	</form>
</template>