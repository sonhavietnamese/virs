<script lang="ts">
	import { PUBLIC_STRIPE_KEY } from '$env/static/public'
	import { MESSAGES } from '$lib/helpers'
	import { characterConfig, networking, partItems, type CharacterConfig } from '$lib/stores'
	import { loadStripe, type Stripe } from '@stripe/stripe-js'
	import { onMount } from 'svelte'
	import { Elements, PaymentElement } from 'svelte-stripe'
	import ButtonBuySol from './button-buy-sol.svelte'
	import RoundButton from './round-button.svelte'
	import { WalletConnectButton, WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui'

	let stripe: Stripe | null = null
	let processing = false
	let clientSecret: string | null = null
	let error = null
	let elements: import('@stripe/stripe-js').StripeElements

	let openStripeModal: boolean = false
	let fiatAmount: number = 0
	let pickedItemId: string = ''
	let pickedItemType: keyof CharacterConfig

	let openConfigPanel: boolean = false

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY)
	})

	const createPaymentIntent = async (amount: number) => {
		const response = await fetch('/api/payment-intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ amount: amount * 100 })
		})
		const { clientSecret } = await response.json()

		return clientSecret
	}

	const handleOpenStripeModal = async (amount: number, id: string, type: keyof CharacterConfig) => {
		openStripeModal = true
		if (!clientSecret) clientSecret = await createPaymentIntent(amount)
		fiatAmount = amount
		pickedItemId = id
		pickedItemType = type
	}

	const handleCloseStripeModal = async () => {
		openStripeModal = false
		processing = false
	}

	async function submit(e: SubmitEvent) {
		e.preventDefault()
		if (processing) return

		processing = true
		const result = await stripe?.confirmPayment({
			elements,
			redirect: 'if_required'
		})

		if (result?.error) {
			error = result.error
			processing = false
		} else {
			partItems.update((item) => {
				const parts = item[pickedItemType]
				parts.map((item) => {
					if (item.id === pickedItemId) item.isOwn = true
				})
				return {
					...item,
					[pickedItemType]: parts
				}
			})

			handleCloseStripeModal()
		}
	}

	const changePart = (part: keyof CharacterConfig, id: string, isOwn: boolean) => {
		if (isOwn) {
			characterConfig.update((parts) => ({ ...parts, [part]: id }))
			$networking &&
				$networking.send(MESSAGES.PLAYER.CHANGE_PART, {
					characterConfig: $characterConfig
				})
		}
	}
</script>

<div class="config">
	<RoundButton
		onClick={() => {
			openConfigPanel = !openConfigPanel
		}}
	>
		<img class="panel__video" src="/icons/coat-hanger.svg" alt="Part config button" />
	</RoundButton>
	<WalletMultiButton />
</div>

{#if stripe && clientSecret && openStripeModal}
	<div class="stripe-modal">
		<div class="stripe-modal__wrapper">
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
					<div>
						<button class="stripe-modal__submit-button" disabled={processing}>
							{#if processing}
								Taking out your money...
							{:else}
								Pay ${fiatAmount}
							{/if}
						</button>
						<button class="stripe-modal__close-button" on:click={handleCloseStripeModal}
							>Close</button
						>
					</div>
				</form>
			</Elements>
		</div>
	</div>
{/if}

{#if openConfigPanel}
	<div class="part-config">
		<div class="part-config__part-section">
			<span class="part-title">Hair</span>
			<div class="part-config__part-section__parts">
				{#each $partItems.hair as hair}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="item-card" on:click={() => changePart('hair', hair.id, hair.isOwn)}>
						<img class="item-card__thumbnail" src={hair.image} alt="Hair item: {hair.id}" />
						{#if !hair.isOwn}
							<div class="item-card__group-button">
								<ButtonBuySol amount={hair.amountSol} type="hair" id={hair.id} />
								<button
									class="item-card__group-button__fiat"
									on:click={() => handleOpenStripeModal(hair.amountFiat, hair.id, 'hair')}
									>${hair.amountFiat}</button
								>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
		<div class="part-config__part-section">
			<span class="part-title">Upper </span>
			<div class="part-config__part-section__parts">
				{#each $partItems.upper as upper}
					<!-- svelte-ignore a11y-click-events-have-key-events -->

					<div class="item-card" on:click={() => changePart('upper', upper.id, upper.isOwn)}>
						<img class="item-card__thumbnail" src={upper.image} alt="upper item: {upper.id}" />
						{#if !upper.isOwn}
							<div class="item-card__group-button">
								<ButtonBuySol amount={upper.amountSol} type="upper" id={upper.id} />
								<button
									class="item-card__group-button__fiat"
									on:click={() => handleOpenStripeModal(upper.amountFiat, upper.id, 'upper')}
									>${upper.amountFiat}</button
								>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
		<div class="part-config__part-section">
			<span class="part-title">Lower </span>
			<div class="part-config__part-section__parts">
				{#each $partItems.lower as lower}
					<!-- svelte-ignore a11y-click-events-have-key-events -->

					<div class="item-card" on:click={() => changePart('lower', lower.id, lower.isOwn)}>
						<img class="item-card__thumbnail" src={lower.image} alt="lower item: {lower.id}" />
						{#if !lower.isOwn}
							<div class="item-card__group-button">
								<ButtonBuySol amount={lower.amountSol} type="lower" id={lower.id} />
								<button
									class="item-card__group-button__fiat"
									on:click={() => handleOpenStripeModal(lower.amountFiat, lower.id, 'lower')}
									>${lower.amountFiat}</button
								>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
		<div class="part-config__part-section">
			<span class="part-title">Shoe </span>
			<div class="part-config__part-section__parts">
				{#each $partItems.shoe as shoe}
					<!-- svelte-ignore a11y-click-events-have-key-events -->

					<div class="item-card" on:click={() => changePart('shoe', shoe.id, shoe.isOwn)}>
						<img class="item-card__thumbnail" src={shoe.image} alt="shoe item: {shoe.id}" />
						{#if !shoe.isOwn}
							<div class="item-card__group-button">
								<ButtonBuySol amount={shoe.amountSol} type="shoe" id={shoe.id} />
								<button
									class="item-card__group-button__fiat"
									on:click={() => handleOpenStripeModal(shoe.amountFiat, shoe.id, 'shoe')}
									>${shoe.amountFiat}</button
								>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	button {
		border-radius: 6px;
		background: #ffffff;
		text-align: center;
		font-size: 14px;
		color: white;

		&:hover {
			scale: 1.02;
		}
	}

	.config {
		position: absolute;
		z-index: 1;
		bottom: 20px;
		right: 20px;
		display: flex;
		gap: 12px;
	}

	.part-config {
		position: absolute;
		width: 360px;
		height: 600px;
		z-index: 1;
		right: 20px;
		bottom: 82px;
		border-radius: 20px;
		overflow-y: scroll;
		overflow-x: hidden;
		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(20px);
		display: flex;
		flex-direction: column;
		gap: 12px;

		&::-webkit-scrollbar {
			display: none;
		}

		&__part-section {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 20px 24px 8px;
			margin-bottom: 20px;

			&__parts {
				width: calc(100% - 24px * 2);
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 12px;
			}
		}
	}

	.part-title {
		color: #ffffff;
		font-size: 20px;
		text-align: left;
		margin-bottom: 12px;
	}

	.item-card {
		width: 100%;
		height: 180px;
		border-radius: 12px;
		background: red;
		overflow: hidden;
		cursor: pointer;
		position: relative;

		&__thumbnail {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: scale 0.2s ease;

			&:hover {
				scale: 1.05;
			}
		}

		&__group-button {
			position: absolute;
			bottom: 8px;
			width: calc(100% - 8px * 2);
			left: 50%;
			transform: translateX(-50%);
			display: grid;
			grid-gap: 6px;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: 30px;

			&__fiat {
				background: rgba(0, 0, 0, 0.5);
				backdrop-filter: blur(20px);
			}
		}
	}

	.stripe-modal {
		overflow: hidden;
		width: 100%;
		height: 100%;
		position: absolute;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(20px);
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0;

		&__wrapper {
			width: 400px;
			padding: 20px;
			border-radius: 20px;
			background: #000000;
		}

		&__submit-button {
			margin-top: 20px;
			padding: 10px 14px;
			background: blue;
		}

		&__close-button {
			padding: 10px 14px;
			background: transparent;
			color: white;
		}
	}
</style>
