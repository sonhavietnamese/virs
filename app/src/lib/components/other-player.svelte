<script lang="ts">
	import type { PlayerPosition, PlayerQuaternion } from '$lib/stores/player'
	import { Mesh, useFrame } from '@threlte/core'
	import { Collider, RigidBody } from '@threlte/rapier'
	import { BoxGeometry, MeshNormalMaterial, Mesh as MeshThree, Quaternion, Vector3 } from 'three'
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'

	export let position: PlayerPosition
	export let quaternion: PlayerQuaternion
	export let sensorEnter: () => void = () => {
		console.log('enter')
	}
	export let sensorExit: () => void = () => {
		console.log('exit')
	}
	let otherPlayerBind: MeshThree
	let rigidBodyBind: RapierRigidBody

	const q = new Quaternion()
	const p = new Vector3()

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

<Mesh
	bind:mesh={otherPlayerBind}
	receiveShadow
	castShadow
	geometry={new BoxGeometry(1, 2, 1)}
	material={new MeshNormalMaterial()}
/>

<RigidBody bind:rigidBody={rigidBodyBind} lockTranslations type="fixed">
	<Collider
		shape={'cuboid'}
		args={[1.5, 1, 1.5]}
		sensor
		on:sensorenter={sensorEnter}
		on:sensorexit={sensorExit}
	/>
</RigidBody>
