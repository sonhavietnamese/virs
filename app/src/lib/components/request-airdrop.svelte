<script lang="ts">
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core'
	import { workSpace } from '@svelte-on-solana/wallet-adapter-ui'
	import { LAMPORTS_PER_SOL, type TransactionSignature, type PublicKey } from '@solana/web3.js'
	import { balanceStore } from '$lib/stores/balance'

	async function onClick() {
		if (!$walletStore.connected) {
			console.log('error', 'Wallet not connected!')
			return
		}

		let signature: TransactionSignature = ''
		const { connection } = $workSpace
		const publicKey = $walletStore.publicKey as PublicKey

		try {
			signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL)
			await connection.confirmTransaction(signature, 'confirmed')
			balanceStore.getUserSOLBalance(publicKey, connection)
		} catch (error: any) {
			console.log('error', `Airdrop failed! ${error?.message}`, signature)
		}
	}
</script>

<div>
	<button on:click={onClick}>
		<span>Airdrop 1</span>
	</button>
</div>
