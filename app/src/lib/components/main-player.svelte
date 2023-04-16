<script lang="ts">
	import { directionOffset, MESSAGES } from '$lib/helpers'
	import { useControl } from '$lib/hooks'
	import { networking } from '$lib/stores'
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { Mesh, OrbitControls, PerspectiveCamera, useFrame, useThrelte } from '@threlte/core'
	import { Collider, RigidBody } from '@threlte/rapier'
	import { BoxGeometry, MeshNormalMaterial, Quaternion, Mesh as ThreeMesh, Vector3 } from 'three'
	import type { OrbitControls as OrbitControlsThree } from 'three/examples/jsm/controls/OrbitControls'

	let playerBind: ThreeMesh
	let rigidBodyBind: RapierRigidBody
	let orbitControlBind: OrbitControlsThree

	const walkDirection = new Vector3()
	const rotateAngle = new Vector3(0, 1, 0)
	const rotateQuaternion = new Quaternion()
	const cameraTarget = new Vector3()

	const direction = new Vector3()
	const frontVector = new Vector3()
	const sideVector = new Vector3()

	const OFFSET = 1
	let counter = 0

	const control = useControl()
	const { camera } = useThrelte()

	useFrame(() => {
		if (!rigidBodyBind) return
		const velocity = rigidBodyBind.linvel()
		counter += 1

		if ($control.w || $control.s || $control.a || $control.d) {
			const angleYCameraDirection = Math.atan2(
				$camera.position.x - playerBind.position.x,
				$camera.position.z - playerBind.position.z
			)
			const dO = directionOffset({
				forward: $control.w,
				backward: $control.s,
				left: $control.a,
				right: $control.d
			})
			rotateQuaternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + dO)
			playerBind.quaternion.rotateTowards(rotateQuaternion, 0.2)
			$camera.getWorldDirection(walkDirection)
			walkDirection.y = 0
			walkDirection.normalize()
			walkDirection.applyAxisAngle(rotateAngle, dO)

			counter % OFFSET === 0 &&
				$networking &&
				$networking.send(MESSAGES.PLAYER.MOVE, {
					position: {
						x: playerBind.position.x,
						y: playerBind.position.y,
						z: playerBind.position.z
					},
					quaternion: {
						x: playerBind.quaternion.x,
						y: playerBind.quaternion.y,
						z: playerBind.quaternion.z,
						w: playerBind.quaternion.w
					}
				})
		}

		frontVector.set(0, 0, Number($control.s) - Number($control.w))
		sideVector.set(Number($control.a) - Number($control.d), 0, 0)
		direction
			.subVectors(frontVector, sideVector)
			.normalize()
			.multiplyScalar(10)
			.applyEuler($camera.rotation)
		rigidBodyBind.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true)

		const translation = rigidBodyBind.translation()

		const p = $camera.position.clone()
		const cameraPositionOffset = p.sub(playerBind.position)
		playerBind.position.set(translation.x, translation.y, translation.z)

		cameraTarget?.set(playerBind.position.x, playerBind.position.y, playerBind.position.z)

		orbitControlBind.target = cameraTarget

		$camera.position.z = translation.z + cameraPositionOffset.z
		$camera.position.x = translation.x + cameraPositionOffset.x
	})
</script>

<PerspectiveCamera position={{ x: 10, y: 2, z: 10 }}>
	<OrbitControls
		bind:controls={orbitControlBind}
		enableZoom={false}
		enablePan={true}
		enableDamping={true}
		minPolarAngle={Math.PI / 4}
		maxPolarAngle={Math.PI / 2}
	/>
</PerspectiveCamera>

<RigidBody
	position={{
		x: 0,
		y: 5,
		z: 0
	}}
	bind:rigidBody={rigidBodyBind}
	enabledRotations={[false, false, false]}
>
	<Collider shape={'cuboid'} args={[0.3, 1, 0.3]} />
</RigidBody>

<Mesh
	bind:mesh={playerBind}
	receiveShadow
	castShadow
	geometry={new BoxGeometry(1, 2, 1)}
	material={new MeshNormalMaterial()}
/>
