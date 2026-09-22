import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		files: {
			appTemplate: 'app.html',
			routes: 'routes',
			lib: 'scripts',
			assets: 'static'
		}
	}
};

export default config;
