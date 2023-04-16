<script lang="ts">
	import type { Animations } from '$lib/stores'
	import type { PlayerPosition, PlayerQuaternion } from '$lib/stores/player'
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { Group, useFrame } from '@threlte/core'
	import { Collider, RigidBody } from '@threlte/rapier'
	import { Group as GroupThree, Quaternion, Vector3 } from 'three'
	import Character from './character.svelte'

	export let position: PlayerPosition
	export let quaternion: PlayerQuaternion
	export let animation: Animations = 'idle.000'
	export let sensorEnter: () => void = () => {
		console.log('enter')
	}
	export let sensorExit: () => void = () => {
		console.log('exit')
	}
	let otherPlayerBind: GroupThree
	let rigidBodyBind: RapierRigidBody

	const q = new Quaternion()
	const p = new Vector3()

	useFrame(() => {
		q.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w)
		p.set(position.x, position.y, position.z)

		if (!otherPlayerBind) return
		otherPlayerBind.position.lerp(p, 0.2)
		otherPlayerBind.quaternion.rotateTowards(q, 0.3)

		rigidBodyBind.setTranslation(
			{
				x: otherPlayerBind.position.x,
				y: otherPlayerBind.position.y,
				z: otherPlayerBind.position.z
			},
			true
		)
	})
</script>

<Group bind:group={otherPlayerBind}>
	<Character {animation} />
</Group>

<RigidBody bind:rigidBody={rigidBodyBind} lockTranslations type="fixed">
	<Collider
		shape={'cuboid'}
		args={[1.5, 1, 1.5]}
		sensor
		on:sensorenter={sensorEnter}
		on:sensorexit={sensorExit}
	/>
</RigidBody>
