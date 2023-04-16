<script lang="ts">
	export let onClick: () => void = () => {}
</script>

<button class="round-button" on:click={onClick}>
	<slot />
</button>

<style lang="scss">
	.round-button {
		border-radius: 50%;
		background: #ffffff;
		padding: 16px;
		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(10px);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
