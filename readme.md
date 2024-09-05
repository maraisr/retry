<div align="left">

<samp>

# retry [![licenses](https://licenses.dev/b/npm/rtri?style=dark)](https://licenses.dev/npm/rtri)

</samp>

**A tiny utility for exponentially retrying**

<br>
<br>

<sup>

This is free to use software, but if you do like it, consider supporting me ❤️

[![sponsor me](https://badgen.net/badge/icon/sponsor?icon=github&label&color=gray)](https://github.com/sponsors/maraisr)
[![buy me a coffee](https://badgen.net/badge/icon/buymeacoffee?icon=buymeacoffee&label&color=gray)](https://www.buymeacoffee.com/marais)

</sup>

</div>

## ⚙️ Install

- **npm** — available as [`rtri`](https://www.npmjs.com/package/rtri)
- **JSR** — available as [`@mr/retry`](https://jsr.io/@mr/retry)

## 🚀 Usage

```ts
import { retry } from 'rtri';

const get_data = await retry(
	async () => {
		const response = await fetch('https://example.com');
		if (!response.ok) throw new Error('not ok');
		return response.json();
	},
	{ attempts: 3 },
);

await get_data();
```

## License

MIT © [Marais Rossouw](https://marais.io)
