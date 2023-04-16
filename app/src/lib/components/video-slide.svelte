<script lang="ts">
	import { nearestPlayers } from '$lib/stores'
	import VideoTile from './video-tile.svelte'

	let slider: HTMLDivElement | null = null
	let isDown = false
	let startX: number
	let scrollLeft: number

	const mouseDown = (e: MouseEvent) => {
		isDown = true
		if (slider) {
			slider.classList.add('active')
			startX = e.pageX - slider.offsetLeft
			scrollLeft = slider.scrollLeft
		}
	}

	const mouseUp = (e: MouseEvent) => {
		isDown = false
		slider?.classList.remove('active')
	}

	const mouseLeave = () => {
		isDown = false
		slider?.classList.remove('active')
	}

	const mouseMove = (e: MouseEvent) => {
		if (!isDown) return
		e.preventDefault()
		if (slider) {
			const x = e.pageX - slider.offsetLeft
			const walk = (x - startX) * 3
			slider.scrollLeft = scrollLeft - walk
		}
	}
</script>

{#if $nearestPlayers.length > 0}
	<div class="video-slide">
		<div
			bind:this={slider}
			class="items"
			style="--count: {$nearestPlayers.length}"
			on:mousedown={mouseDown}
			on:mousemove={mouseMove}
			on:mouseleave={mouseLeave}
			on:mouseup={mouseUp}
		>
			{#each $nearestPlayers as peerID}
				<VideoTile {peerID} />
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.video-slide {
		background: #ffffff;
		position: absolute;

		::-webkit-scrollbar {
			display: none;
		}
	}

	@supports (display: grid) {
		.video-slide {
			display: grid;
			background: rgba(0, 0, 0, 0.2);
			backdrop-filter: blur(20px);
			position: absolute;
			top: 90px;
			left: 50%;
			transform: translateX(-50%);
			z-index: 1;
			max-width: 90vw;
			border-radius: 24px;
			padding: 12px;
		}

		.items {
			--count: 0;

			position: relative;
			width: 100%;
			height: 100%;
			overflow-x: scroll;
			overflow-y: hidden;
			white-space: nowrap;
			transition: all 0.2s;
			will-change: transform;
			user-select: none;
			cursor: pointer;
			display: grid;
			grid-template-columns: repeat(var(--count), 1fr);
			gap: 12px;
		}
	}
</style>
