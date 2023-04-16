<script lang="ts">
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core'
	import { workSpace } from '@svelte-on-solana/wallet-adapter-ui'
	import {
		Connection,
		Keypair,
		type PublicKey,
		clusterApiUrl,
		sendAndConfirmTransaction,
		Transaction
	} from '@solana/web3.js'
	import { balanceStore } from '$lib/stores/balance'
	import { WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui'
	import RequestAirdrop from '$lib/components/request-airdrop.svelte'
	import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

	$: $walletStore.connected &&
		balanceStore.getUserSOLBalance($walletStore.publicKey as PublicKey, $workSpace.connection)

	const network = WalletAdapterNetwork.Devnet
	const endpoint = clusterApiUrl(network)
	const connection = new Connection(endpoint)

	$: ({ publicKey, sendTransaction } = $walletStore)

	const pay = async () => {
		const response = await fetch('/api/payment-solpay', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				account: publicKey?.toString()
			})
		})

		const json = await response.json()

		const transaction = Transaction.from(Buffer.from(json.transaction, 'base64'))

		try {
			await sendTransaction(transaction, connection)
		} catch (e) {
			console.error(e)
		}

		console.log(json)
	}
</script>

<WalletMultiButton />
<RequestAirdrop />
{#if $walletStore.connected}
	<p>SOL Balance: {($balanceStore.balance || 0).toLocaleString()}</p>
{/if}

<button class="b" on:click={pay}>Pay</button>

<style>
	.b {
		padding: 12px;
		background: red;
	}
</style>
