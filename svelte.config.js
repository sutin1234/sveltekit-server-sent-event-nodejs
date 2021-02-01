const sveltePreprocess = require('svelte-preprocess');
module.exports = {
	// extensions: ['.svelte'],
	preprocess: [
		sveltePreprocess({
			customElement: true,
			// compileOptions: {
			// 	customElement: true
			// }
		})
	],
	kit: {
		adapter: '@sveltejs/adapter-node',
		target: '#svelte'
	}
};
