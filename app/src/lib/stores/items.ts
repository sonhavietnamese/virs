import { persisted } from 'svelte-local-storage-store'

export const partItems = persisted('part-items', {
	hair: [
		{
			id: '000',
			image: '/images/hair.000.png',
			isOwn: true,
			amountFiat: 200,
			amountSol: 1.5
		},
		{
			id: '001',
			image: '/images/hair.001.png',
			isOwn: false,
			amountFiat: 120,
			amountSol: 2
		},
		{
			id: '002',
			image: '/images/hair.002.png',
			isOwn: false,
			amountFiat: 250,
			amountSol: 1.25
		},
		{
			id: '003',
			image: '/images/hair.003.png',
			isOwn: false,
			amountFiat: 240,
			amountSol: 3
		}
	],
	upper: [
		{
			id: '000',
			image: '/images/upper.000.png',
			isOwn: true,
			amountFiat: 142,
			amountSol: 2.1
		},
		{
			id: '001',
			image: '/images/upper.001.png',
			isOwn: false,
			amountFiat: 500,
			amountSol: 2
		},
		{
			id: '002',
			image: '/images/upper.002.png',
			isOwn: false,
			amountFiat: 120,
			amountSol: 1.2
		},
		{
			id: '003',
			image: '/images/upper.003.png',
			isOwn: false,
			amountFiat: 320,
			amountSol: 1.5
		}
	],
	lower: [
		{
			id: '000',
			image: '/images/lower.000.png',
			isOwn: true,
			amountFiat: 350,
			amountSol: 1.7
		},
		{
			id: '001',
			image: '/images/lower.001.png',
			isOwn: false,
			amountFiat: 350,
			amountSol: 1.7
		},
		{
			id: '002',
			image: '/images/lower.002.png',
			isOwn: false,
			amountFiat: 270,
			amountSol: 1.4
		},
		{
			id: '003',
			image: '/images/lower.003.png',
			isOwn: false,
			amountFiat: 230,
			amountSol: 2
		}
	],
	shoe: [
		{
			id: '000',
			image: '/images/shoe.000.png',
			isOwn: true,
			amountFiat: 100,
			amountSol: 1.2
		},
		{
			id: '001',
			image: '/images/shoe.001.png',
			isOwn: false,
			amountFiat: 350,
			amountSol: 2.4
		},
		{
			id: '002',
			image: '/images/shoe.002.png',
			isOwn: false,
			amountFiat: 500,
			amountSol: 3
		}
	]
})
