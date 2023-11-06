export type Config = {
	attempts?: number;
	delay?: number;
};

export function retry<Fn extends (...args: any[]) => any>(fn: Fn, opts?: Config): (...args: Parameters<Fn>) => Promise<ReturnType<Fn>>;
export const rtri: typeof retry;

export function lretry<Fn extends (...args: any[]) => any>(fn: Fn, opts?: Config): (...args: Parameters<Fn>) => Promise<ReturnType<Fn>>;
