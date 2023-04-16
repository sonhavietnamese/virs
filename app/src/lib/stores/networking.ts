import type { Room } from 'colyseus.js'
import { writable } from 'svelte/store'

export const networking = writable<Room>()
