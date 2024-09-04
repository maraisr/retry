import { assertEquals, assertInstanceOf, assertRejects } from '@std/assert';

import * as lib from './mod.ts';

const someError = new Error('test error');

Deno.test('exports', () => {
	assertInstanceOf(lib.retry, Function);
	assertInstanceOf(lib.lretry, Function);
});

Deno.test('nothing failed, dont retry', async () => {
	let fn = lib.retry((a: number) => a);
	assertEquals(await fn(1), 1);
});

for (let testFn of [lib.retry, lib.lretry]) {
	Deno.test(testFn.name, async (t) => {
		await t.step('retries', async () => {
			let i = 0;

			let fn = testFn(
				(a: number) => {
					if (++i !== 3) throw someError;
					return a;
				},
				{ attempts: 3, delay: 0 },
			);

			assertEquals(await fn(1), 1);
			assertEquals(i, 3);
		});

		await t.step('surface an error', async () => {
			let i = 0;
			let fn = testFn(
				() => {
					i++;
					throw someError;
				},
				{ delay: 0, attempts: 1 },
			);

			await assertRejects(() => fn());
			assertEquals(i, 1);
		});

		await t.step('should only retry up to max', async () => {
			let i = 0;
			let fn = testFn(
				() => {
					i++;
					throw someError;
				},
				{ attempts: 3, delay: 0 },
			);

			await assertRejects(() => fn());
			assertEquals(i, 3);
		});
	});
}
