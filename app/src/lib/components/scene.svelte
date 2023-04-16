<script lang="ts">
	import { nearestPlayers, otherPlayers } from '$lib/stores/player'
	import { AmbientLight } from '@threlte/core'
	import { CollisionGroups } from '@threlte/rapier'
	import Map from './map.svelte'
	import OtherPlayer from './other-player.svelte'
	import MainPlayer from './main-player.svelte'

	const sensorEnter = (peerID: string) =>
		nearestPlayers.update((player) => (player.includes(peerID) ? player : [...player, peerID]))

	const sensorExit = (peerID: string) =>
		nearestPlayers.update((player) => player.filter((p) => p !== peerID))
</script>

<AmbientLight intensity={1} />

<CollisionGroups groups={[0, 15]}>
	<Map />
</CollisionGroups>

<CollisionGroups groups={[0]}>
	<MainPlayer />

	{#if $otherPlayers}
		{#each Object.entries($otherPlayers) as [key, value]}
			<OtherPlayer
				quaternion={value.quaternion}
				position={value.position}
				sensorEnter={() => sensorEnter(value.peerID)}
				sensorExit={() => sensorExit(value.peerID)}
			/>
		{/each}
	{/if}
</CollisionGroups>
