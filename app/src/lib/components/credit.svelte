<script lang="ts">
	const twitter = 'https://twitter.com/s0nhaaa'
	const github = 'https://github.com/sonhaaa/svelte-hackathon'
</script>

<div class="credit">
	<a target="_blank" href={twitter}>Twitter.</a>
	<a target="_blank" href={github}>Github.</a>
</div>

<style lang="scss">
	.credit {
		position: absolute;
		z-index: 1;
		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(10px);
		padding: 16px 20px;
		border-radius: 50px;
		top: 20px;
		right: 20px;
		display: flex;
		align-items: center;
		gap: 12px;
	}
</style>
