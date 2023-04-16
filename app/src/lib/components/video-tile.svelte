<script lang="ts">
	import { onDestroy } from 'svelte'
	import { selectVideoTrackByID } from '@100mslive/hms-video-store'
	import { hmsActions, hmsStore } from '$lib/helpers'

	export let mirror: boolean = false
	export let trackId: string
	export let objectFit = 'cover'

	let unsub: () => void = () => {}
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

<video
	class="peer-video"
	style="--objectFit: {objectFit}"
	class:mirror
	bind:this={videoElement}
	autoPlay
	muted
	playsInline
/>

<style>
	.peer-video {
		height: 100%;
		width: 100%;
		border-radius: 0.25rem;
		object-fit: var(--objectFit);
	}

	.peer-video.mirror {
		transform: scaleX(-1);
	}
</style>
