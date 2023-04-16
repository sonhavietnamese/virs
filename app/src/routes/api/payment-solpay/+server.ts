import { createTransfer, parseURL, encodeURL, type TransferRequestURL } from '@solana/pay'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
	Connection,
	Keypair,
	PublicKey,
	clusterApiUrl,
	sendAndConfirmTransaction
} from '@solana/web3.js'
import { json } from '@sveltejs/kit'
import BigNumber from 'bignumber.js'

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { account } = await request.json()
	const network = WalletAdapterNetwork.Devnet
	const endpoint = clusterApiUrl(network)

	const buyerPublicKey = new PublicKey(account)
	const shopPublicKey = new PublicKey('8JuftNoN7ddSqp9wEmxxNxfLy26RFWDm6rGcbRtnNTVW')

	const url = encodeURL({
		recipient: shopPublicKey,
		amount: new BigNumber(1),
		reference: buyerPublicKey,
		label: 'Jungle Cats store',
		message: 'Jungle Cats store - your order - #001234',
		memo: 'JC#4098'
	})

	const connection = new Connection(endpoint)

	const { recipient, amount, reference, label, message, memo } = parseURL(url) as TransferRequestURL
	console.log('label: ', label)
	console.log('message: ', message)
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
