<script lang="ts">
	import type { Animations, CharacterConfig } from '$lib/stores'
	import { GLTF, useGltfAnimations } from '@threlte/extras'
	import { concat, filter, remove } from 'lodash-es'
	import type { Object3D } from 'three'

	export let animation: Animations = 'idle.000'
	export let characterConfig: CharacterConfig
	let prevAnimation: Animations

	// const { gltf, actions } = useGltfAnimations<Animations>(({ actions }) => {
	// 	actions['idle.000']?.reset().fadeIn(0.2).play()
	// })

	const { gltf, actions } = useGltfAnimations<Animations>()

	const parts = ['hair', 'upper', 'lower', 'shoe']

	$: if ($actions[animation]) {
		if (prevAnimation !== animation) {
			$actions[prevAnimation]?.fadeOut(0.2)
			$actions[animation]?.reset().fadeIn(0.2).play()
			prevAnimation = animation
		}
	}

	let nodes: { [key: string]: Object3D } = {}

	$: {
		let a
		if (characterConfig) {
			a = filter(nodes, (n) => {
				const prop = n.userData?.prop
				if (!prop) return false
				const part = (prop as string).split('.')[0] as keyof CharacterConfig
				return prop === `${part}.${characterConfig[part]}`
			})
		}
		if ($gltf) {
			$gltf.scene.children[0].children = remove($gltf.scene.children[0].children, (n) => {
				if (!n.userData.prop) return n.userData
				const part = (n.userData.prop as string).split('.')[0] as keyof CharacterConfig

				return !parts.includes(part)
			})
			$gltf.scene.children[0].children = concat(
				$gltf.scene.children[0].children,
				a
			) as Object3D<Event>[]
		}
	}
</script>

<GLTF
	position={{
		x: 0,
		y: -0.5,
		z: 0
	}}
	castShadow
	receiveShadow
	url={'/models/svelte-character-v2.glb'}
	bind:gltf={$gltf}
	bind:nodes
	useDraco="https://www.gstatic.com/draco/v1/decoders/"
/>
