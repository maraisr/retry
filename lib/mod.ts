/**
 * The configuration object for the retry functions.
 */
export type Config = {
	/** The nuymber of times the function should be retried. */
	attempts?: number;
	/** The base delay in milliseconds between each retry. */
	delay?: number;
};

/**
 * Exponentially retry a function until it succeeds or the maximum number of attempts is reached.
 *
 * Each delay will be calculated as `delay * 2 ** c`, where `c` is the current attempt number, and an applied jitter.
 *
 * @example
 * ```ts
 * let fn = retry(
 * 	async (url: string) => {
 *    let res = await fetch(url);
 *    if (!res.ok) throw new Error(await res.text());
 *    return await res.json();
 * });
 *
 * let data = await fn('https://api.example.com/data');
 * ```
 */
export function retry<Fn extends (...args: any[]) => any>(
	f: Fn,
	opts: Config = {},
): (...args: Parameters<Fn>) => Promise<ReturnType<Fn>> {
	let { attempts = 3, delay = 100 } = opts;

	return async function run(...args: Parameters<Fn>) {
		let c = 0, m = 0;

		while (1) {
			try {
				return await f(...args);
			} catch (err) {
				if (++c >= attempts) throw err;
				m = delay * 2 ** c;
				m = m / 2 + (Math.random() * m) / 2;
				await new Promise((r) => setTimeout(r, m));
			}
		}
	};
}

/**
 * Linear retry a function until it succeeds or the maximum number of attempts is reached.
 *
 * Each delay will be calculated as `delay * c`, where `c` is the current attempt number, and an applied jitter.
 *
 * @example
 * ```ts
 * let fn = lretry(
 * 	async (url: string) => {
 *    let res = await fetch(url);
 *    if (!res.ok) throw new Error(await res.text());
 *    return await res.json();
 * });
 *
 * let data = await fn('https://api.example.com/data');
 * ```
 */
export function lretry<Fn extends (...args: any[]) => any>(
	f: Fn,
	opts: Config = {},
): (...args: Parameters<Fn>) => Promise<ReturnType<Fn>> {
	let { attempts = 3, delay = 100 } = opts;

	return async function run(...args: Parameters<Fn>) {
		let c = 0, m = 0;

		while (1) {
			try {
				return await f(...args);
			} catch (err) {
				if (++c >= attempts) throw err;
				m = delay * c;
				m = m / 2 + (Math.random() * m) / 2;
				await new Promise((r) => setTimeout(r, m));
			}
		}
	};
}
