import { writable } from 'svelte/store'
import { persisted } from 'svelte-local-storage-store'

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

export type PlayerPosition = {
	x: number
	y: number
	z: number
}

export type PlayerQuaternion = {
	x: number
	y: number
	z: number
	w: number
}

export type Player = {
	[key: string]: {
		id?: string
		peerID: string
		position: PlayerPosition
		quaternion: PlayerQuaternion
		action: Animations
		characterConfig: CharacterConfig
	}
}

export type CharacterConfig = {
	hair: string
	upper: string
	lower: string
	shoe: string
}

export const otherPlayers = writable<Player>()
export const mainPlayers = writable<Player>()
export const nearestPlayers = writable<string[]>([])
export const characterConfig = persisted<CharacterConfig>('character-config', {
	hair: '',
	upper: '',
	lower: '',
	shoe: ''
})
