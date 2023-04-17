# Virs 🍖

PoC bring online meeting to the next level

## ✨ Features

- Avatar configurable
- Buy items via crypto (Solana - devnet) and fiat
- Video & Audio share
- Avatar interactable

[Live](https://virs.vercel.app/)

## ⚙ Dependencies

- @sveltejs
- @colyseus (Multiplayer)
- @threlte (3D)
- @svelte-on-solana
- @solana/pay (payment)
- svelte-stripe (payment)

## 🔧 Development

Requirements

- Node (^16.14 || >=18)
- NPM
- [Stripe](https://dashboard.stripe.com/) account
- [100ms.live](https://dashboard.100ms.live/) account

Clone repo

```sh
git clone https://github.com/sonhaaa/virs.git
cd virs
```

Install `service-multiplayer` dependencies

```sh
cd service-multiplayer
npm i
```

Start the `multiplayer` server

```sh
npm start
# Or using Docker compose
docker compose up -d
```

Install `app` dependencies

```sh
cd app
npm i
```

Create `.env` file. To know more about `100ms.live` endpoint, room_id, room_role checkout [100ms.live docs](https://www.100ms.live/docs/javascript/v2/get-started/token)

```sh
HMS_ENDPOINT=
HMS_ROOM_ID=
HMS_ROOM_ROLE=

PUBLIC_STRIPE_KEY=
SECRET_STRIPE_KEY=
```

Run `app` dev server

```sh
npm run dev
```

## 🚀 Deployment

### Backend

- Deploy the `service-multiplayer`, follow [these steps](https://gist.github.com/sonhaaa/2b70db1ebdc6b9a88520b686948aeb1e)
- Change the `wss://virs.trysts.io` to your URL from 👆 (above) step (`/src/lib/components/multiplayer-network.svelte`)
- Change `Hb2HDX6tnRfw5j442npy58Z2GBzJA58Nz7ipouWGT63p` to your Solana wallet address (`/src/routes/api/payment-solpay/+server.ts`)

### Client

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsonhaaa%2Fvirs&env=HMS_ENDPOINT,HMS_ROOM_ID,HMS_ROOM_ROLE,PUBLIC_STRIPE_KEY,SECRET_STRIPE_KEY)
