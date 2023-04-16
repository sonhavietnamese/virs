<script lang="ts">
	import { otherPlayers } from '$lib/stores'
	import { size } from 'lodash-es'

	const memberCount = size($otherPlayers) + 1 // include you
</script>

<div class="member-count">
	<img src="/icons/peoples.svg" alt="Member count item" loading="lazy" class="member-count__icon" />
	<span class="member-count__text">{memberCount}</span>
</div>

<style lang="scss">
	.member-count {
		position: absolute;
		z-index: 1;
		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(10px);
		padding: 15px 20px 15px 15px;
		border-radius: 50px;
		top: 20px;
		left: 20px;
		display: flex;
		align-items: center;
		gap: 8px;
	}
</style>
