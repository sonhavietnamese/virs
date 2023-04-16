<script lang="ts">
	import { hmsActions, hmsIsAudioEnabled, hmsIsVideoEnabled } from '$lib/helpers'
	import RoundButton from './round-button.svelte'

	const toggleAudio = () => hmsActions.setLocalAudioEnabled(!$hmsIsAudioEnabled)
	const toggleVideo = () => hmsActions.setLocalVideoEnabled(!$hmsIsVideoEnabled)
</script>

<div class="panel">
	<RoundButton onClick={toggleAudio}>
		{#if $hmsIsAudioEnabled}
			<img class="panel__audio" src="/icons/audio-on.svg" alt="Audio is on" />
		{:else}
			<img class="panel__audio" src="/icons/audio-off.svg" alt="Audio is off" />
		{/if}
	</RoundButton>
	<RoundButton onClick={toggleVideo}>
		{#if $hmsIsVideoEnabled}
			<img class="panel__video" src="/icons/video-on.svg" alt="Video is on" />
		{:else}
			<img class="panel__video" src="/icons/video-off.svg" alt="Video is off" />
		{/if}
	</RoundButton>
</div>

<style lang="scss">
	.panel {
		position: absolute;
		z-index: 1;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;

		&__audio,
		&__video {
			width: 20px;
			height: 20px;
		}
	}
</style>
