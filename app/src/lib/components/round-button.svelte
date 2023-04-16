<script lang="ts">
	export let onClick: () => void = () => {}
</script>

<button class="round-button" on:click={onClick}>
	<slot />
</button>

<style lang="scss">
	@layer properties {
		@property --button-shadow-opacity {
			syntax: '<number>';
			inherits: true;
			initial-value: 0;
		}
		@property --button-shadow-spread {
			syntax: '<number>';
			inherits: true;
			initial-value: 0;
		}
		@property --button-bg-opacity {
			syntax: '<number>';
			inherits: true;
			initial-value: 0;
		}
		@property --button-after-opacity {
			syntax: '<number>';
			inherits: true;
			initial-value: 0;
		}
		@property --coord-y {
			syntax: '<number>';
			inherits: true;
			initial-value: 0;
		}
		@property --coord-x {
			syntax: '<number>';
			inherits: true;
			initial-value: 0;
		}
	}

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
