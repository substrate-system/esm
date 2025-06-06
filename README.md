# esm
[![GitHub Pages deploy](https://img.shields.io/github/actions/workflow/status/substrate-system/esm/gh-pages.yml?style=flat-square)](https://github.com/substrate-system/esm/actions/workflows/gh-pages.yml)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![types](https://img.shields.io/npm/types/@substrate-system/esm?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![GZip size](https://img.shields.io/bundlephobia/minzip/@substrate-system/esm?style=flat-square&color=brightgreen)](https://bundlephobia.com/package/@substrate-system/esm)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/esm)](https://packagephobia.com/result?p=@substrate-system/esm)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![license](https://img.shields.io/badge/license-Big_Time-blue?style=flat-square)](LICENSE)


Feature detection for modules (ESM) + dynamic imports.

<details><summary><h2>Contents</h2></summary>

<!-- toc -->

- [Install](#install)
- [Use](#use)
  * [ESM + Bundler](#esm--bundler)
  * [Common JS](#common-js)
  * [pre-built JS](#pre-built-js)
- [Example](#example)
- [Build](#build)
  * [Application code](#application-code)
  * [Dependencies](#dependencies)
- [develop](#develop)

<!-- tocstop -->

</details>

## Install

```sh
npm i -S @substrate-system/esm
```

## API

### `esm`
Dynamic imports?

```ts
function esm ():boolean
```

### `importMap`
Is `importmap` supported?

```ts
function importMap ():boolean
```

### `umd(...files:string[])`
Create script tags in the document, and wait for them to load.

```ts
async function umd (...files:string[]):Promise<void>
```

## Use

### ESM + Bundler
```js
import {
    importMap,
    esm,
    umd
} from '@substrate-system/esm'
```

### Common JS
```js
require('@substrate-system/esm')
```

### pre-built JS
Copy the minified files to a location that is accessible to your web server,
then link to them in HTML.

#### copy
```sh
cp ./node_modules/@substrate-system/esm/dist/index.min.js ./public/esm.min.js
```

#### HTML
```html
<script type="module" src="./esm.min.js"></script>
```

### CSP
You will need to add `unsafe-eval` to your CSP.

```
script-src 'self' 'unsafe-eval';
```

## Example

> [!NOTE]  
> This would be for a script built a "global name" of `test`,
> e.g. `--global-name=test`. The name you access on `globalThis` depends on your
> build process.

```js
import { importMap, esm, umd } from '@substrate-system/esm'

const importMapOk = importMap()
const dynamic = esm()

if (dynamic) {
  const { hello } = await import('/test.js')
  hello()
} else {
  // load a UMD script
  await umd('/test.umd.js')
  hello = globalThis.test.hello
  hello()
}
```

## Build
If you need to support both newer platforms, and also platforms without
ES modules, then build a UMD version in addition to building modules.

### Application code

> [!NOTE]  
> The argument `--external:"./test.js"`

In your top-level module, build it with the relevant dependencies
excluded, not bundled.

```sh
esbuild ./test/index.ts --external:"./test.js" --format=iife --bundle --keep-names > public/bundle.js
```

### Dependencies

> [!NOTE]  
> The `--global-name` argument

Given the example above, you would want to build your dependency module
as an `IIFE` function, attached to `window` at `.test`, in addition to building
it as a normal ESM module.

```sh
esbuild ./src/test.ts --global-name=test --format=iife --bundle --keep-names > public/test.umd.js
```

## develop

Three commands:

Build the file, and start a server:

```sh
npm start
```

Build the files in `iife` format, and start a server:

```sh
npm run start:iife
```

Build in `2016` compatibility mode:

```sh
npm run start:2016
```

Development is a little bit janky because there is not an easy way to start
an old version of a browser.

That's why, in the iife and `2016` versions, we do an extra check, besides
looking at `esm()`.
