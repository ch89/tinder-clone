<script setup>
	import { ref, nextTick } from "vue"

	defineProps(["card"])
	const emit = defineEmits(["swipe"])

	const x = ref(0)
	const y = ref(0)
	const rotation = ref(0)
	const transition = ref(true)
	const limit = 375 / 2

	let grab = e => {
		transition.value = false

		addEventListener("pointermove", drag)
		addEventListener("pointerup", drop, { once: true })
	}

	let drag = e => {
		x.value += e.movementX
		y.value += e.movementY
		rotation.value = x.value / 375 * 12
	}

	let drop = async e => {
		removeEventListener("pointermove", drag)

		transition.value = true

		await nextTick()

		if(x.value > limit) {
			emit("swipe", "like")
		}
		else if(x.value < -limit) {
			emit("swipe", "nope")
		}
		else {
			x.value = 0
			y.value = 0
			rotation.value = 0
		}
	}
</script>

<template>
	<div class="absolute inset-0 touch-none select-none" :class="{ transition }" @pointerdown="grab" :style="{ transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)` }">
		<img :src="card.photoURL" draggable="false" class="w-full h-full object-cover">
		<h3 class="absolute bottom-4 left-4 text-white text-2xl font-bold drop-shadow">{{ card.displayName }}</h3>
		<button class="absolute top-4 left-4 border-4 border-green-400 text-green-400 px-4 py-2 rounded-lg text-2xl font-bold -rotate-12 opacity-0" :class="{ transition }" :style="{ opacity: x / limit }">Like</button>
		<button class="absolute top-4 right-4 border-4 border-red-400 text-red-400 px-4 py-2 rounded-lg text-2xl font-bold rotate-12 opacity-0" :class="{ transition }" :style="{ opacity: -x / limit }">Nope</button>
	</div>
</template>