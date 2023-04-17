<script lang="ts">
	import { partItems, type CharacterConfig } from '$lib/stores'
	import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
	import { Connection, Transaction, clusterApiUrl } from '@solana/web3.js'
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core'

	export let amount: number
	export let type: keyof CharacterConfig
	export let id: string
	export let maxNumberOfWallets = 3

	const network = WalletAdapterNetwork.Devnet
	const endpoint = clusterApiUrl(network)
	const connection = new Connection(endpoint)

	$: ({ publicKey, sendTransaction } = $walletStore)

	const pay = async () => {
		await $walletStore.connect()

		if ($walletStore.connected) {
			const response = await fetch('/api/payment-solpay', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					account: publicKey?.toString(),
					solAmount: amount
				})
			})

			const json = await response.json()

			const transaction = Transaction.from(Buffer.from(json.transaction, 'base64'))

			try {
				await sendTransaction(transaction, connection)
				partItems.update((item) => {
					const parts = item[type]
					parts.map((item) => {
						if (item.id === id) item.isOwn = true
					})
					return {
						...item,
						[type]: parts
					}
				})
			} catch (e) {
				console.error(e)
			}
		}
	}
</script>

<button class="button-buy-sol" on:click={pay}>{amount}SOL</button>

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

	.button-buy-sol {
		background: linear-gradient(
			105.42deg,
			rgba(221, 108, 203, 0.5) 0%,
			rgba(195, 41, 220, 0.5) 100%
		);
		backdrop-filter: blur(20px);
		color: #ffffff;
	}
</style>
