import { writable } from 'svelte/store'

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

type Player = {
	[key: string]: {
		position: PlayerPosition
		quaternion: PlayerQuaternion
	}
}

export const otherPlayers = writable<Player>()
export const mainPlayers = writable<Player>()
export const nearestPlayers = writable<Player>()
