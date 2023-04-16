<script lang="ts">
	import { otherPlayers } from '$lib/stores/player'
	import { AmbientLight } from '@threlte/core'
	import { CollisionGroups } from '@threlte/rapier'
	import Map from './map.svelte'
	import OtherPlayer from './other-player.svelte'
	import MainPlayer from './main-player.svelte'
</script>

<AmbientLight intensity={1} />

<CollisionGroups groups={[0, 15]}>
	<Map />
</CollisionGroups>

<CollisionGroups groups={[0]}>
	<MainPlayer />

	{#if $otherPlayers}
		{#each Object.entries($otherPlayers) as [key, value]}
			<OtherPlayer quaternion={value.quaternion} position={value.position} />
		{/each}
	{/if}
</CollisionGroups>
