import type { Config } from 'eretry';

export function retry<Fn extends (...args: any[]) => any>(
	f: Fn,
	opts: Config = {},
) {
	let { attempts = 3, delay = 100 } = opts;

	return async function run(...args: Parameters<Fn>) {
		let c = 0, m = 0;

		while(1) try {
			return await f(...args);
		} catch (err) {
			if (++c >= attempts) throw err;
			m = delay * 2 ** c;
			m = m / 2 + (Math.random() * m) / 2;
			await new Promise((r) => setTimeout(r, m));
		}
	};
}

export { retry as eretry };

export function lretry<Fn extends (...args: any[]) => any>(
	f: Fn,
	opts: Config = {},
) {
	let { attempts = 3, delay = 100 } = opts;

	return async function run(...args: Parameters<Fn>) {
		let c = 0, m = 0;

		while (1) try {
			return await f(...args);
		} catch (err) {
			if (++c >= attempts) throw err;
			m = delay * c;
			m = m / 2 + (Math.random() * m) / 2;
			await new Promise((r) => setTimeout(r, m));
		};
	};
}
