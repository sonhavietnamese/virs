import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['three', 'troika-three-text']
	},
	optimizeDeps: {
		include: ['@project-serum/anchor', '@solana/web3.js', 'buffer']
	}
})
