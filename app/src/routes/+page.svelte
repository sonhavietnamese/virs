<script lang="ts">
	import {
		Credit,
		HmsNetwork,
		Loading,
		MemberCount,
		MultiplayerNetwork,
		Panel,
		PartConfig,
		Scene,
		VideoSlide
	} from '$lib/components'
	import MyVideo from '$lib/components/my-video.svelte'
	import { Canvas } from '@threlte/core'
	import { World } from '@threlte/rapier'
</script>

<svelte:head>
	<title>Virs 🍖</title>
</svelte:head>

<div class="container">
	<HmsNetwork />
	<MultiplayerNetwork />
	<Loading>
		<Canvas>
			<World>
				<Scene />
			</World>
		</Canvas>

		<MyVideo />
		<MemberCount />
		<Credit />
		<Panel />
		<PartConfig />

		<VideoSlide />
	</Loading>
</div>

<style>
	.container {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
</style>
