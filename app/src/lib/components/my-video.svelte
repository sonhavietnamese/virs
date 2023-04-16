<script lang="ts">
	import { hmsActions, hmsStore } from '$lib/helpers'
	import { selectLocalPeer } from '@100mslive/hms-video-store'
	import { onDestroy, onMount } from 'svelte'

	let unsub: () => void = () => {}
	let videoElement: HTMLVideoElement

	const manageVideo = () => {
		if (unsub) unsub()

		if (!videoElement) return

		unsub = hmsStore.subscribe((peer) => {
			if (!peer) {
				return
			}

			if (peer.videoTrack) {
				hmsActions.attachVideo(peer.videoTrack, videoElement)
			}
		}, selectLocalPeer)
	}

	onMount(() => manageVideo())

	onDestroy(() => unsub?.())
</script>

<div class="my-video">
	<video class="my-video__inner" bind:this={videoElement} autoPlay muted playsInline />
</div>

<style lang="scss">
	.my-video {
		position: absolute;
		z-index: 1;
		bottom: 20px;
		left: 20px;
		background: #000000;
		width: 300px;
		height: 180px;
		border-radius: 20px;
		overflow: hidden;

		&__inner {
			height: 100%;
			width: 100%;
			transform: scaleX(-1);
			object-fit: cover;
		}
	}
</style>
