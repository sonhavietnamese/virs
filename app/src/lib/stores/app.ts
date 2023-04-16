import { writable } from 'svelte/store'

type AppState = {
	isReady: boolean
}

export const app = writable<AppState>()
