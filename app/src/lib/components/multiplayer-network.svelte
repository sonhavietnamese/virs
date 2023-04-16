<script lang="ts">
	import { networking } from '$lib/stores'
	import { mainPlayers, otherPlayers } from '$lib/stores'
	import { Client } from 'colyseus.js'
	import { omit } from 'lodash-es'

	let client = new Client('ws://localhost:2567')

	const joinRoom = async () => {
		try {
			const room = await client.joinOrCreate('world', {
				/* options */
			})
			room.state.players.onAdd = (player, sessionId: string) => {
				sessionId !== room.sessionId &&
					otherPlayers.update((other) => ({
						...other,
						[`${player.id}`]: {
							position: {
								x: player.position.x,
								y: player.position.y,
								z: player.position.z
							},
							quaternion: {
								x: player.quaternion.x,
								y: player.quaternion.y,
								z: player.quaternion.z,
								w: player.quaternion.w
							}
						}
					}))

				player.onChange = function () {
					if (sessionId !== room.sessionId) {
						otherPlayers.update((other) => ({
							...other,
							[`${player.id}`]: {
								position: {
									x: player.position.x,
									y: player.position.y,
									z: player.position.z
								},
								quaternion: {
									x: player.quaternion.x,
									y: player.quaternion.y,
									z: player.quaternion.z,
									w: player.quaternion.w
								}
							}
						}))
					}
				}
			}

			room.state.players.onRemove = (player, sessionId: string) => {
				otherPlayers.update((other) => omit(other, sessionId))
			}

			networking.set(room)
		} catch (e) {
			console.error('join error', e)
		}
	}
</script>

{#await joinRoom()}{/await}
