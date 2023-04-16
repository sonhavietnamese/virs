<script lang="ts">
	import { hmsActions } from '$lib/helpers'

	const join = async () => {
		const response = await fetch(
			'https://prod-in2.100ms.live/hmsapi/shtest.app.100ms.live/api/token',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					room_id: '6438f9a58ed44f432c7b959f',
					role: 'student',
					user_id: 'acb'
				})
			}
		)

		const a = await response.json()
		console.log(a)
		const config = {
			userName: 'SH',
			authToken: a.token,
			settings: {
				isAudioMuted: true,
				isVideoMuted: true
			},
			metaData: JSON.stringify({ city: 'Da Nang' }),
			rememberDeviceSelection: true
		}

		try {
			await hmsActions.join(config)
		} catch (error) {
			console.log(error)
		}
	}

	const leaveRoom = () => hmsActions.leave()
</script>

<svelte:window on:unload={leaveRoom} />

{#await join()}{/await}
