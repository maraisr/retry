<div align="left">

<samp>

# rtri

</samp>

**A tiny utility for exponentially retryin**

<a href="https://npm-stat.com/charts.html?package=rtri">
  <img src="https://badgen.net/npm/dm/rtri?color=black&label=npm%20downloads" alt="js downloads">
</a>
<a href="https://unpkg.com/rtri/index.mjs">
  <img src="https://img.badgesize.io/https://unpkg.com/rtri/index.mjs?compression=gzip&label=gzip&color=black" alt="gzip size" />
</a>
<a href="https://unpkg.com/rtri/index.mjs">
  <img src="https://img.badgesize.io/https://unpkg.com/rtri/index.mjs?compression=brotli&label=brotli&color=black" alt="brotli size" />
</a>

<br>
<br>

<sup>

This is free to use software, but if you do like it, consisder supporting me ❤️

[![sponsor me](https://badgen.net/badge/icon/sponsor?icon=github&label&color=gray)](https://github.com/sponsors/maraisr)
[![buy me a coffee](https://badgen.net/badge/icon/buymeacoffee?icon=buymeacoffee&label&color=gray)](https://www.buymeacoffee.com/marais)

</sup>

</div>

## ⚙️ Install

```shell
npm add rtri
```

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
