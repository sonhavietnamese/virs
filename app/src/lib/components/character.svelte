<script lang="ts">
	import type { Animations, CharacterConfig } from '$lib/stores'
	import { GLTF, useGltfAnimations } from '@threlte/extras'
	import { concat, filter } from 'lodash-es'
	import { onDestroy } from 'svelte'
	import { Bone, type Object3D } from 'three'

	export let animation: Animations = 'idle.000'
	export let characterConfig: CharacterConfig
	export let isMain: boolean
	let prevAnimation: Animations = animation

	const { gltf, actions } = useGltfAnimations<Animations>()

	let nodes: { [key: string]: Object3D } = {}

	$: {
		let a
		if (characterConfig && $gltf) {
			a = filter(nodes, (n) => {
				const prop = n.userData?.prop
				if (!prop) return false
				const part = (prop as string).split('.')[0] as keyof CharacterConfig
				return prop === `${part}.${characterConfig[part]}`
			})
			$gltf.scene.children[0].children = filter($gltf.scene.children[0].children, (n) => {
				return ['body', 'head'].includes(n.userData.name) || n instanceof Bone
			})
			$gltf.scene.children[0].children = concat(
				$gltf.scene.children[0].children,
				a
			) as Object3D<Event>[]
		}
	}

	$: {
		if ($actions[animation]) {
			$actions[prevAnimation]?.fadeOut(0.2)
			$actions[animation]?.reset().fadeIn(0.2).play()
			prevAnimation = animation
		}
	}

	onDestroy(() => {
		$actions[animation]?.fadeOut(0.2)
	})
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
