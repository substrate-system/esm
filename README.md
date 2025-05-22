# esm
[![types](https://img.shields.io/npm/types/@substrate-system/esm?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![GZip size](https://img.badgesize.io/https%3A%2F%2Fesm.sh%2F%40substrate-system%2Fesm%2Fes2022%2Fesm.mjs?compression=gzip&style=flat-square)](https://esm.sh/@substrate-system/esm/es2022/esm.mjs)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/esm)](https://packagephobia.com/result?p=@substrate-system/esm)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![license](https://img.shields.io/badge/license-Polyform_Small_Business-249fbc?style=flat-square)](LICENSE)


Feature detection for modules + dynamic imports.

<details><summary><h2>Contents</h2></summary>

<!-- toc -->

- [Install](#install)
- [Use](#use)
  * [ESM + Bundler](#esm--bundler)
  * [Common JS](#common-js)
  * [pre-built JS](#pre-built-js)
- [example](#example)

<!-- tocstop -->

</details>

## Install

```sh
npm i -S @substrate-system/esm
```

## Use
This exposes ESM and common JS via [package.json `exports` field](https://nodejs.org/api/packages.html#exports).

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
This package exposes minified JS files too. Copy them to a location that is
accessible to your web server, then link to them in HTML.

#### copy
```sh
cp ./node_modules/@substrate-system/esm/dist/index.min.js ./public/esm.min.js
```

#### HTML
```html
<script type="module" src="./esm.min.js"></script>
```

## example

```js
import { importMap, esm, umd } from '@substrate-system/esm'

const importMapOk = importMap()
const dynamic = esm()

if (!dynamic) {
  // load a UMD script
  umd('/js/script.js')
}
```
