<script setup>
	import { ref, computed, reactive } from "vue"
	import { useRoute, useRouter } from "vue-router"
	import { useStore } from "vuex"
	import { getAuth } from "firebase/auth"

	const route = useRoute()
	const router = useRouter()
	const store = useStore()
	const user = getAuth().currentUser

	const match = computed(() => store.state.matches.find(match => match.id == route.params.id))

	let messages = reactive([
		{
			id: 1,
			name: match.value.name,
			photo: match.value.photo,
			text: "How are you?"
		}
	])

	let text = ref("")

	let add = e => {
		// Version 1
		// const { uid, photoURL } = user
		// messages.push({ uid, photoURL, text: text.value })

		// Version 2
		messages.push({
			id: user.uid,
			photo: user.photoURL,
			text: text.value
		})

		text.value = ""
	}
</script>

<template>
	<div class="p-4 flex flex-col gap-4 overflow-auto">
		<div v-for="{ id, photo, text } in messages" class="flex items-center gap-4" :class="{ 'flex-row-reverse': id == user.uid }">
			<img :src="photo" alt="Photo" class="w-12 h-12 object-cover rounded-full">
			<div class="p-4 rounded-lg max-w-[50%]" :class="id == user.uid ? 'bg-blue-400 text-white' : 'bg-gray-100'">{{ text }}</div>
		</div>
	</div>
	<form class="flex gap-4 p-4 border-t" @submit.prevent="add">
		<button class="bg-green-400 text-white w-10 h-10 rounded-full" type="button">
			<i class="fa-solid fa-face-smile"></i>
		</button>
		<div class="bg-gray-100 border rounded-full px-4 flex gap-4 flex-1 text-gray-400">
			<input placeholder="Type a message" class="flex-1 bg-transparent focus:outline-none" v-model.trim="text">
			<button :disabled="! text">Send</button>
		</div>
	</form>
</template>