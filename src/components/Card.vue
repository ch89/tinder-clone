<script setup>
	import interact from "https://cdn.interactjs.io/v1.10.11/interactjs/index.js"
	import { ref, onMounted, nextTick } from "vue"

	defineProps(["card"])
	const emit = defineEmits(["swipe"])

	let el = ref(null),
		transition = ref(true),
		x = ref(0),
		y = ref(0),
		rotation = ref(0),
		width = screen.width / 2

	onMounted(() => {
		interact(el.value).draggable({
			listeners: {
				start(e) {
					transition.value = false
				},
				move(e) {
					x.value += e.dx
					y.value += e.dy

					rotation.value = x.value / screen.width * 12
				},
				async end(e) {
					transition.value = true

					await nextTick()

					if(x.value > width) {
						emit("swipe", "like")
					}
					else if(x.value < -width) {
						emit("swipe", "nope")
					}
					else {
						x.value = 0
						y.value = 0
						rotation.value = 0
					}
				}
			}
		})
	})
</script>

<template>
	<div
		class="absolute inset-0 touch-none"
		:class="{ transition }"
		:style="{ transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)` }"
		ref="el">
		<img :src="card.photo" alt="Photo" class="h-full w-full object-cover">
		<div class="absolute bottom-4 left-4 text-white">
			<h3 class="text-2xl font-bold drop-shadow">{{ card.name }}, {{ card.age }}</h3>
			<p class="drop-shadow">This is the tinder description</p>
		</div>
		<div class="label left-4 border-green-400 text-green-400 -rotate-12" :class="{ transition }" :style="{ opacity: x / width }">Like</div>
		<div class="label right-4 border-red-400 text-red-400 rotate-12" :class="{ transition }" :style="{ opacity: -x / width }">Nope</div>
	</div>
</template>

<style scoped>
	.label {
		@apply absolute top-4 border-4 px-4 py-2 rounded-lg text-2xl font-bold opacity-0;
	}
</style>