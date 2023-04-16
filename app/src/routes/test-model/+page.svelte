<script lang="ts">
	import Map from '$lib/components/map.svelte'
	import { AmbientLight, Canvas, OrbitControls, PerspectiveCamera } from '@threlte/core'
	import { Debug, World } from '@threlte/rapier'

	import '../styles.css'
</script>

<div class="a">
	<Canvas>
		<AmbientLight color={0xffffff} intensity={1} />

		<PerspectiveCamera
			position={{
				x: 5,
				y: 10,
				z: 5
			}}
		>
			<OrbitControls />
		</PerspectiveCamera>

		<World>
			<Map />

			<Debug />
		</World>
	</Canvas>
</div>

<style>
	.a {
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 100vh;
	}
</style>
