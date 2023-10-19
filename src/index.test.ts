import { describe, test, expect } from 'bun:test';

import * as lib from '.';

const someError = new Error('test error');

test('api', () => {
	expect(lib.retry).toBeFunction();
	expect(lib.eretry).toBeFunction();
	expect(lib.lretry).toBeFunction();
});

test('nothing failed, dont retry', async () => {
	let fn = lib.retry((a: number) => a);
	expect(await fn(1)).toBe(1);
});

for (let testFn of [lib.eretry, lib.lretry]) {
	describe(testFn.name, () => {
		test('retries', async () => {
			let i = 0;

			let fn = testFn(
				(a: number) => {
					if (++i !== 3) throw someError;
					return a;
				},
				{ attempts: 3, delay: 0 },
			);

			expect(await fn(1)).toBe(1);
			expect(i).toBe(3);
		});

		test('surface an error', async () => {
			let fn = testFn(
				() => {
					throw someError;
				},
				{ delay: 0 },
			);

			expect(() => fn()).toThrow(someError);
		});

		test('should only retry up to max', async () => {
			let i = 0;

			let fn = testFn(
				() => {
					i++;
					throw someError;
				},
				{ attempts: 3, delay: 0 },
			);

			expect(() => fn()).toThrow(someError);
			expect(i).toBe(3);
		});
	});
}
