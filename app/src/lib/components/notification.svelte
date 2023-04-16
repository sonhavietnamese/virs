<script lang="ts">
	const content = 'Someone just joined! Say hey to them ✌🏿'
</script>

<div class="notification">
	<span class="notification__content">{content}</span>
</div>

<style lang="scss">
	.notification {
		position: absolute;
		z-index: 10;
		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(10px);
		padding: 16px 20px;
		border-radius: 50px;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);

		&__content {
			color: #ffffff;
		}
	}
</style>
