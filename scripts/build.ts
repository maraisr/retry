import { build, emptyDir } from '@deno/dnt';

await emptyDir('./npm');

await build({
	entryPoints: ['./mod.ts'],
	outDir: './npm',
	shims: {
		deno: true,
	},

	declaration: 'separate',
	scriptModule: 'cjs',
	typeCheck: 'both',
	test: false,

	importMap: 'deno.json',

	package: {
		name: 'rtri',
		version: Deno.args[0],
		repository: 'maraisr/retry',
		license: 'MIT',
		description: 'A tiny exponentially retry wrapping function',
		author: {
			name: 'Marais Rososuw',
			email: 'me@marais.dev',
			url: 'https://marais.io',
		},
		keywords: [
			'exponential',
			'retry',
			'retrying',
			'retryable',
			'retryable-function',
			'expoential-backoff',
		],
	},

	compilerOptions: {
		target: 'ES2022',
		lib: ['ES2022', 'WebWorker'],
	},

	filterDiagnostic(diag) {
		let txt = diag.messageText.toString();
		return !txt.includes(
			// ignore type error for missing Deno built-in information
			`Type 'ReadableStream<string>' must have a '[Symbol.asyncIterator]()' method that returns an async iterator`,
		);
	},

	async postBuild() {
		await Deno.copyFile('license', 'npm/license');
		await Deno.copyFile('readme.md', 'npm/readme.md');
	},
});
