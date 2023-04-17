<script lang="ts">
	import { nearestPlayers, otherPlayers } from '$lib/stores'
	import { AmbientLight } from '@threlte/core'
	import { CollisionGroups } from '@threlte/rapier'
	import Map from './map.svelte'
	import OtherPlayer from './other-player.svelte'
	import MainPlayer from './main-player.svelte'
	import { app } from '$lib/stores/app'

	const sensorEnter = (peerID: string) =>
		nearestPlayers.update((player) => (player.includes(peerID) ? player : [...player, peerID]))

	const sensorExit = (peerID: string) =>
		nearestPlayers.update((player) => player.filter((p) => p !== peerID))
</script>

<AmbientLight intensity={1} />

<CollisionGroups groups={[0, 15]}>
	<Map />
</CollisionGroups>

{#if $app?.isReady}
	<CollisionGroups groups={[0]}>
		<MainPlayer />

		{#if $otherPlayers}
			{#each Object.entries($otherPlayers) as [key, value]}
				<OtherPlayer
					quaternion={value.quaternion}
					position={value.position}
					animation={value.action}
					sensorEnter={() => sensorEnter(value.peerID)}
					sensorExit={() => sensorExit(value.peerID)}
					characterConfig={value.characterConfig}
				/>
			{/each}
		{/if}
	</CollisionGroups>
{/if}
