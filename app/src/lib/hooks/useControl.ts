import { onDestroy } from 'svelte'
import { derived, get, writable } from 'svelte/store'
export const useControl = () => {
	const wasdKeys = writable({
		w: false,
		a: false,
		s: false,
		d: false
	})
	const onKeyDown = (e) => {
		if (!Object.keys(get(wasdKeys)).includes(e.key)) return
		wasdKeys.update((keys) => {
			keys[e.key] = true
			return keys
		})
	}
	const onKeyUp = (e) => {
		if (!Object.keys(get(wasdKeys)).includes(e.key)) return
		wasdKeys.update((keys) => {
			keys[e.key] = false
			return keys
		})
	}

	window.addEventListener('keydown', onKeyDown)
	window.addEventListener('keyup', onKeyUp)
	onDestroy(() => {
		window.removeEventListener('keydown', onKeyDown)
		window.removeEventListener('keyup', onKeyUp)
	})

	return wasdKeys
}
