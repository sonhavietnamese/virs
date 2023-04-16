<script lang="ts">
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

<div class="video-slide">
	<div
		bind:this={slider}
		class="items"
		on:mousedown={mouseDown}
		on:mousemove={mouseMove}
		on:mouseleave={mouseLeave}
		on:mouseup={mouseUp}
	>
		<VideoTile />
		<VideoTile />
		<VideoTile />
		<VideoTile />
	</div>
</div>

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
			grid-template-columns: repeat(4, 1fr);
			gap: 12px;
		}
	}
</style>
