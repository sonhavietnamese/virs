<script lang="ts">
	import { onDestroy } from 'svelte'
	import { selectVideoTrackByID } from '@100mslive/hms-video-store'
	import { hmsActions, hmsStore } from '$lib/helpers'
	import { truncate } from 'lodash-es'

	// export let trackId: string
	let trackId: string

	let unsub: () => void = () => {}
	let videoElement: HTMLVideoElement

	const name = 'ABCHoangTienTHinh oangTienTHin oangTienTHin oangTienTHin'

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

<div class="video-tile">
	<video class="video-tile__video" bind:this={videoElement} autoPlay muted playsInline />
	<div class="video-tile__audio">
		<img src="/icons/audio-on.svg" alt={`${name} audio is on`} class="video-tile__audio--inner" />
	</div>
	<div class="video-tile__name">
		<span class="video-tile__name--inner">{truncate(name, { length: 20 })}</span>
	</div>
</div>

<style lang="scss">
	.video-tile {
		display: inline-block;
		width: 232px;
		height: 156px;
		background: #000000;
		border-radius: 16px;
		position: relative;

		&__video {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		&__audio {
			border-radius: 50%;
			padding: 6px;
			background: rgba(0, 0, 0, 0.2);
			backdrop-filter: blur(10px);
			position: absolute;
			display: flex;
			top: 6px;
			right: 6px;

			&--inner {
				width: 14px;
				height: 14px;
			}
		}

		&__name {
			padding: 4px 10px 7px;
			background: rgba(0, 0, 0, 0.2);
			backdrop-filter: blur(10px);
			position: absolute;
			bottom: 6px;
			left: 6px;
			border-radius: 10px;

			&--inner {
				color: #e6e6e6;
				font-size: 14px;
			}
		}
	}
</style>
