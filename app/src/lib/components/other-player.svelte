<script lang="ts">
	import type { PlayerPosition, PlayerQuaternion } from '$lib/stores/player'
	import { Mesh, useFrame } from '@threlte/core'
	import { BoxGeometry, MeshNormalMaterial, Mesh as MeshThree, Quaternion, Vector3 } from 'three'

	export let position: PlayerPosition
	export let quaternion: PlayerQuaternion
	let otherPlayerBind: MeshThree

	const q = new Quaternion()
	const p = new Vector3()

	$: q.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w)
	$: p.set(position.x, position.y, position.z)

	useFrame(() => {
		if (!otherPlayerBind) return
		otherPlayerBind.position.lerp(p, 0.2)
		otherPlayerBind.quaternion.rotateTowards(q, 0.3)
	})
</script>

<Mesh
	bind:mesh={otherPlayerBind}
	receiveShadow
	castShadow
	geometry={new BoxGeometry(1, 2, 1)}
	material={new MeshNormalMaterial()}
/>
