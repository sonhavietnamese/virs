<script lang="ts">
	import type { Animations } from '$lib/stores'
	import type { CharacterConfig, PlayerPosition, PlayerQuaternion } from '$lib/stores/player'
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { Group, useFrame } from '@threlte/core'
	import { Collider, RigidBody } from '@threlte/rapier'
	import { Group as GroupThree, Quaternion, Vector3 } from 'three'
	import Character from './character.svelte'
	import OtherCharacter from './other-character.svelte'
	import { isEqual } from 'lodash-es'

	export let position: PlayerPosition
	export let quaternion: PlayerQuaternion
	export let animation: Animations = 'idle.000'
	export let characterConfig: CharacterConfig
	export let sensorEnter: () => void = () => {
		console.log('enter')
	}
	export let sensorExit: () => void = () => {
		console.log('exit')
	}

	let prevCharacterConfig: CharacterConfig = characterConfig

	let otherPlayerBind: GroupThree
	let rigidBodyBind: RapierRigidBody

	const q = new Quaternion()
	const p = new Vector3()

	$: if (!isEqual(prevCharacterConfig, characterConfig)) prevCharacterConfig = characterConfig

	$: q.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w)
	$: p.set(position.x, position.y, position.z)
	useFrame(() => {
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

<RigidBody bind:rigidBody={rigidBodyBind} lockTranslations type="fixed">
	<Collider
		shape={'cuboid'}
		args={[1.5, 1, 1.5]}
		sensor
		on:sensorenter={sensorEnter}
		on:sensorexit={sensorExit}
	/>
</RigidBody>

<Group bind:group={otherPlayerBind}>
	<Character isMain={false} {animation} characterConfig={prevCharacterConfig} />
</Group>
