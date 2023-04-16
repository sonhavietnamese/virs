<script lang="ts">
	import {
		Scene,
		HmsNetwork,
		MultiplayerNetwork,
		Notification,
		MemberCount,
		Credit,
		Panel,
		VideoSlide,
		Loading
	} from '$lib/components'
	import { Debug, World } from '@threlte/rapier'
	import './styles.css'
	import { Canvas } from '@threlte/core'
	import MyVideo from '$lib/components/my-video.svelte'
	import { nearestPlayers } from '$lib/stores'
	// import { loadStripe, type Stripe } from '@stripe/stripe-js'
	// import { Elements, PaymentElement, LinkAuthenticationElement, Address } from 'svelte-stripe'
	// import { onMount } from 'svelte'
	// import { PUBLIC_STRIPE_KEY } from '$env/static/public'
	// import { goto } from '$app/navigation'

	// let stripe: Stripe | null = null
	// let processing = false
	// let clientSecret = null
	// let error = null
	// let elements

	// onMount(async () => {
	// 	stripe = await loadStripe(PUBLIC_STRIPE_KEY)
	// 	clientSecret = await createPaymentIntent()
	// })

	// const createPaymentIntent = async () => {
	// 	const response = await fetch('/payment-intent', {
	// 		method: 'POST',
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		},
	// 		body: JSON.stringify({})
	// 	})
	// 	const { clientSecret } = await response.json()

	// 	return clientSecret
	// }

	// async function submit(e) {
	// 	e.preventDefault()
	// 	// avoid processing duplicates
	// 	if (processing) return

	// 	processing = true

	// 	// confirm payment with stripe
	// 	const result = await stripe.confirmPayment({
	// 		elements,
	// 		redirect: 'if_required'
	// 	})

	// 	// log results, for debugging
	// 	console.log({ result })

	// 	if (result.error) {
	// 		// payment failed, notify user
	// 		error = result.error
	// 		processing = false
	// 	} else goto('/thanks')
	// }
</script>

<!-- {#if stripe && clientSecret}
	<Elements
		{stripe}
		{clientSecret}
		theme="night"
		labels="floating"
		variables={{ colorPrimary: '#7c4dff' }}
		rules={{ '.Input': { border: 'solid 1px #0002' } }}
		bind:elements
	>
		<form on:submit|preventDefault={submit}>
			<PaymentElement />

			<button disabled={processing}>
				{#if processing}
					Processing...
				{:else}
					Pay
				{/if}
			</button>
		</form>
	</Elements>
{:else}
	Loading...
{/if} -->

<div class="container">
	<HmsNetwork />
	<MultiplayerNetwork />
	<Loading>
		<Canvas>
			<World>
				<Scene />
			</World>
		</Canvas>

		<MyVideo />
		<Notification />
		<MemberCount />
		<Credit />
		<Panel />

		<VideoSlide />
	</Loading>
</div>

<style>
	.container {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
</style>
