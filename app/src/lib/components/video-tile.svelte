<script lang="ts">
	import { hmsStore } from '$lib/helpers'
	import { selectIsPeerAudioEnabled, selectVideoTrackByPeerID } from '@100mslive/hms-video-store'
	import { truncate } from 'lodash-es'
	import { onDestroy } from 'svelte'
	import Video from './video.svelte'

	export let peerID: string
	let isAudioEnabled: boolean = false
	let t: string

	const name = 'ABCHoangTienTHinh oangTienTHin oangTienTHin oangTienTHin'

	const unsub1 = hmsStore.subscribe((video) => {
		if (!video) return
		t = video.id
	}, selectVideoTrackByPeerID(peerID))

	const unsub2 = hmsStore.subscribe((enabled: boolean) => {
		isAudioEnabled = enabled
	}, selectIsPeerAudioEnabled(peerID))

	onDestroy(() => {
		unsub1()
		unsub2()
	})
</script>

<div class="video-tile">
	<Video trackId={t} />
	<div class="video-tile__audio">
		{#if isAudioEnabled}
			<img
				src="/icons/audio-on.svg"
				alt={`${name}  loading="lazy" audio is on`}
				class="video-tile__audio--inner"
			/>
		{:else}
			<img
				loading="lazy"
				src="/icons/audio-off.svg"
				alt={`${name} audio is off`}
				class="video-tile__audio--inner"
			/>
		{/if}
	</div>
	<div class="video-tile__name">
		<span class="video-tile__name--inner">{truncate(peerID, { length: 20 })}</span>
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
		overflow: hidden;

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
