<script lang="ts">
	import type { Animations } from '$lib/stores'
	import { GLTF, useGltfAnimations } from '@threlte/extras'

	export let animation: Animations = 'idle.000'
	let prevAnimation: Animations

	const { gltf, mixer, actions } = useGltfAnimations<Animations>()

	$: if ($actions[animation]) {
		if (prevAnimation !== animation) {
			$actions[prevAnimation]?.fadeOut(0.2)
			$actions[animation]?.reset().fadeIn(0.2).play()
			prevAnimation = animation
		}
	}

	// $: if ($gltf) $gltf.scene.children[0].children = $gltf.scene.children[0].children.slice(0, 4)
</script>

<GLTF
	position={{
		x: 0,
		y: -0.5,
		z: 0
	}}
	castShadow
	receiveShadow
	url={'/models/svelte-character.glb'}
	bind:gltf={$gltf}
	useDraco="https://www.gstatic.com/draco/v1/decoders/"
/>
