import { writable } from 'svelte/store'

type AppState = {
	isReady: boolean
}

export type Animations =
	| 'angry.000'
	| 'bow.000'
	| 'cheer.000'
	| 'clap.000'
	| 'dance.000'
	| 'discuss.000'
	| 'fall.000'
	| 'fall.001'
	| 'fall.002'
	| 'hit.000'
	| 'hit.001'
	| 'hit.002'
	| 'idle.000'
	| 'idle.001'
	| 'idle.002'
	| 'idle.003'
	| 'idle.004'
	| 'kick.000'
	| 'kick.001'
	| 'kick.002'
	| 'kick.003'
	| 'lay.000'
	| 'punch.000'
	| 'punch.001'
	| 'punch.002'
	| 'run.000'
	| 'sad.000'
	| 'sad.001'
	| 'sit.000'
	| 'sit.001'
	| 'sit.002'
	| 'sit.003'
	| 'victory.000'
	| 'walk.000'
	| 'wave.000'

export const app = writable<AppState>()
