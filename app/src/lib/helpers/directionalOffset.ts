const directionOffset = (keysPressed: {
	forward: boolean
	backward: boolean
	left: boolean
	right: boolean
}) => {
	let directionOffset = 0

	if (keysPressed.backward) {
		if (keysPressed.right) {
			directionOffset = Math.PI / 4
		} else if (keysPressed.left) {
			directionOffset = -Math.PI / 4
		}
	} else if (keysPressed.forward) {
		if (keysPressed.right) {
			directionOffset = Math.PI / 4 + Math.PI / 2
		} else if (keysPressed.left) {
			directionOffset = -Math.PI / 4 - Math.PI / 2
		} else {
			directionOffset = Math.PI
		}
	} else if (keysPressed.right) {
		directionOffset = Math.PI / 2
	} else if (keysPressed.left) {
		directionOffset = -Math.PI / 2
	}

	return directionOffset
}

export { directionOffset }
