<script setup>
	import Card from "../components/Card.vue"
	import { ref, reactive } from "vue"

	const cards = reactive([
		{ id: 1, name: "Nisse", age: 3, photo: "/images/cat1.jpg" },
		{ id: 2, name: "Smulan", age: 7, photo: "/images/cat2.jpg" },
		{ id: 3, name: "Essim", age: 19, photo: "/images/cat3.jpg" },
		{ id: 4, name: "Fluffy", age: 6, photo: "/images/cat4.jpg" },
		{ id: 5, name: "Lulle", age: 12, photo: "/images/cat5.jpg" },
	])

	let swipe = e => cards.pop()
</script>

<template>
	<div class="relative">
		<card v-for="card in cards" :key="card.id" :card="card" @click="swipe"></card>
	</div>
	<div class="flex justify-between p-4 border-t">
		<button class="btn text-[#f5b748]">
			<i class="fa-solid fa-reply"></i>
		</button>
		<button class="btn text-[#ec5e6f]">
			<i class="fa-solid fa-times"></i>
		</button>
		<button class="btn text-[#62b4f9]">
			<i class="fa-solid fa-star"></i>
		</button>
		<button class="btn text-[#76e2b3]">
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
</style>