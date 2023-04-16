<script lang="ts">
	import { onDestroy } from 'svelte'
	import { selectVideoTrackByID } from '@100mslive/hms-video-store'
	import { hmsActions, hmsStore } from '$lib/helpers'

	export let trackId: string
	let unsub: () => void
	let videoElement: HTMLVideoElement

	const manageVideo = (trackId: string, videoElement: HTMLVideoElement) => {
		if (unsub) unsub() // unsubscribe previous

		if (!trackId || !videoElement) return

		unsub = hmsStore.subscribe((track) => {
			if (!track) {
				return
			}
			if (track?.enabled) {
				hmsActions.attachVideo(track.id, videoElement)
			} else {
				hmsActions.detachVideo(track.id, videoElement)
			}
		}, selectVideoTrackByID(trackId))
	}

	$: manageVideo(trackId, videoElement)

	onDestroy(() => unsub?.())
</script>

<video class="video" bind:this={videoElement} autoPlay muted playsInline />

<style lang="scss">
	.video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
