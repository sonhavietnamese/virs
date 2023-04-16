<script lang="ts">
	import { MESSAGES } from '$lib/helpers'
	import { characterConfig, networking, type CharacterConfig } from '$lib/stores'

	const changePart = (part: keyof CharacterConfig, id: string) => {
		characterConfig.update((parts) => ({ ...parts, [part]: id }))
		$networking &&
			$networking.send(MESSAGES.PLAYER.CHANGE_PART, {
				characterConfig: $characterConfig
			})
	}
</script>

<div class="part-config">
	<button on:click={() => changePart('hair', '001')}>hair 1</button>
	<button on:click={() => changePart('hair', '002')}>hair 2</button>
	<button on:click={() => changePart('upper', '001')}>upper 1</button>
	<button on:click={() => changePart('upper', '002')}>upper 2</button>
	<button on:click={() => changePart('lower', '001')}>lower 1</button>
	<button on:click={() => changePart('lower', '002')}>lower 2</button>
	<button on:click={() => changePart('shoe', '001')}>shoe 1</button>
	<button on:click={() => changePart('shoe', '002')}>shoe 2</button>
</div>

<style lang="scss">
	.part-config {
		position: absolute;
		z-index: 1;
		right: 20px;
		top: 100px;
	}
</style>
