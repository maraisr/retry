import { retry, lretry } from 'rtri';

declare function assert<T>(thing: T): void;

assert<Promise<number>>(retry(() => 1)());
assert<Promise<number>>(lretry(() => 1)());

assert<Promise<string>>(retry((a: string) => a)('test'));

// @ts-expect-error
assert<Promise<number>>(retry((a: string) => a)('test'));

// @ts-expect-error
assert<Promise<number>>(retry((a: number) => a)('test'));

assert<Promise<string>>(
	retry((a: string) => a, {
		attempts: 1,
		delay: 100,
		// @ts-expect-error
		foo: 'test',
	})(''),
);
