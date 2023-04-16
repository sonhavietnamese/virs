<script lang="ts">
	import { hmsIsVideoEnabled, hmsLocalPeer } from '$lib/helpers'
	import { fade } from 'svelte/transition'
	import Video from './video.svelte'
</script>

{#if $hmsIsVideoEnabled && $hmsLocalPeer?.videoTrack}
	<div
		class="my-video"
		transition:fade|local={{
			duration: 200
		}}
	>
		<Video trackId={$hmsLocalPeer.videoTrack} />
	</div>
{/if}

<style lang="scss">
	.my-video {
		position: absolute;
		z-index: 1;
		bottom: 20px;
		left: 20px;
		background: #000000;
		width: 280px;
		height: 180px;
		border-radius: 20px;
		overflow: hidden;
	}
</style>
