<script setup>
	defineProps(["card"])
</script>

<template>
	<div class="absolute inset-0">
		<img :src="card.photo" alt="Photo" class="h-full w-full object-cover">
		<div class="absolute bottom-4 left-4 text-white">
			<h3 class="text-2xl font-bold drop-shadow">{{ card.name }}, {{ card.age }}</h3>
			<p class="drop-shadow">This is the tinder description</p>
		</div>
	</div>
</template>