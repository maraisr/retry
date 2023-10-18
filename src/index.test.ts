import { test, expect } from 'bun:test';

import * as lib from '.';

test('api', () => {
	expect(lib.retry).toBeFunction();
	expect(lib.eretry).toBeFunction();
	expect(lib.lretry).toBeFunction();
});

test('should work', async () => {
	let fn = lib.retry((a: number) => a);
	expect(await fn(1)).toBe(1);
});

test('should retry', async () => {
	let i = 0;

	let fn = lib.retry(
		(a: number) => {
			if (++i % 2) throw new Error(String(a));
			return a;
		},
		{ delay: 0 },
	);

	expect(await fn(1)).toBe(1);
	expect(i).toBe(2);
});

test('should only retry up to max', async () => {
	let i = 0;

	let fn = lib.retry(
		(a: number) => {
			i++;
			throw new Error(String(a));
		},
		{ attempts: 3, delay: 0 },
	);

	expect(() => fn(1)).toThrow('1');

	expect(i).toBe(3);
});
