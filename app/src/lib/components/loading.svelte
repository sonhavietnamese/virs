<script lang="ts">
	import { hmsIsConnected } from '$lib/helpers'
	import { networking } from '$lib/stores'
	import { app } from '$lib/stores/app'
	import { useProgress } from '@threlte/extras'
	import gsap from 'gsap'

	let overlayPath: gsap.TweenTarget
	let isAnimating = false
	let isDone = false

	const paths = {
		step1: {
			unfilled: 'M 0 100 V 100 Q 50 100 100 100 V 100 z',
			inBetween: {
				curve1: 'M 0 100 V 50 Q 50 0 100 50 V 100 z',
				curve2: 'M 0 100 V 50 Q 50 100 100 50 V 100 z'
			},
			filled: 'M 0 100 V 0 Q 50 0 100 0 V 100 z'
		},
		step2: {
			filled: 'M 0 0 V 100 Q 50 100 100 100 V 0 z',
			inBetween: {
				curve1: 'M 0 0 V 50 Q 50 0 100 50 V 0 z',
				curve2: 'M 0 0 V 50 Q 50 100 100 50 V 0 z'
			},
			unfilled: 'M 0 0 V 0 Q 50 0 100 0 V 0 z'
		}
	}

	const reveal = () => {
		if (isAnimating && $app.isReady && isDone) return
		isAnimating = true

		gsap
			.timeline({
				onComplete: () => {
					isDone = true
				}
			})
			.set(overlayPath, {
				attr: { d: paths.step1.unfilled }
			})
			.to(
				overlayPath,
				{
					duration: 0.8,
					ease: 'power4.in',
					attr: { d: paths.step1.inBetween.curve1 }
				},
				0
			)
			.to(overlayPath, {
				duration: 0.2,
				ease: 'power1',
				attr: { d: paths.step1.filled },
				onComplete: () => {
					isDone = true
					app.set({ isReady: true })
				}
			})
			.set(overlayPath, {
				attr: { d: paths.step2.filled }
			})
			.to(overlayPath, {
				duration: 0.2,
				ease: 'sine.in',
				attr: { d: paths.step2.inBetween.curve1 }
			})
			.to(overlayPath, {
				duration: 1,
				ease: 'power4',
				attr: { d: paths.step2.unfilled }
			})
	}

	const { progress } = useProgress()

	$: if ($hmsIsConnected && $networking && $progress === 1) reveal()
</script>

{#if !isDone}
	<div class="loading-wrapper">
		<span class="loading-wrapper__text">Hang tight</span>
	</div>
{/if}

<div class="loading">
	<svg class="overlay" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
		<path
			bind:this={overlayPath}
			vector-effect="non-scaling-stroke"
			d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
		/>
	</svg>
	<slot />
</div>

<style lang="scss">
	.loading {
		width: 100vw;
		height: 100vh;
	}

	.overlay {
		pointer-events: none;
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 1000;
	}

	.loading-wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: white;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		align-items: center;
		justify-content: center;
		color: black;
		z-index: 1000;

		&__text {
			font-size: 16px;
			color: #000000;
		}
	}
</style>
