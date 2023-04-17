import { createTransfer, encodeURL, parseURL, type TransferRequestURL } from '@solana/pay'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { json } from '@sveltejs/kit'
import BigNumber from 'bignumber.js'

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { account, solAmount } = await request.json()
	const network = WalletAdapterNetwork.Devnet
	const endpoint = clusterApiUrl(network)

	const buyerPublicKey = new PublicKey(account)
	const shopPublicKey = new PublicKey('Hb2HDX6tnRfw5j442npy58Z2GBzJA58Nz7ipouWGT63p')

	const url = encodeURL({
		recipient: shopPublicKey,
		amount: new BigNumber(solAmount),
		reference: buyerPublicKey,
		label: 'Virs store',
		message: 'Virs store - your order',
		memo: 'VIRS'
	})

	const connection = new Connection(endpoint)

	const { recipient, amount, reference, memo } = parseURL(url) as TransferRequestURL

	const transaction = await createTransfer(connection, buyerPublicKey, {
		recipient,
		amount,
		reference,
		memo
	})

	const serializedTransaction = transaction.serialize({
		requireAllSignatures: false
	})

	const base64 = serializedTransaction.toString('base64')

	return json({
		transaction: base64
	})
}
