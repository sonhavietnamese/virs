<script lang="ts">
	import { Mesh } from '@threlte/core'
	import { useGltf } from '@threlte/extras'
	import { AutoColliders } from '@threlte/rapier'
	import { derived } from 'svelte/store'
	import type { Mesh as ThreeMesh } from 'three'

	const { gltf } = useGltf('/models/map.glb', {
		useDraco: true
	})

	const map = derived(gltf, (gltf) => {
		if (!gltf || !gltf.nodes['Cube012']) return
		return gltf.nodes['Cube012'] as ThreeMesh
	})
</script>

{#if $map}
	<AutoColliders shape="trimesh" position={{ y: -0.5 }}>
		<Mesh castShadow geometry={$map.geometry} material={$map.material} />
	</AutoColliders>
{/if}
