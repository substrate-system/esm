import Debug from '@substrate-system/debug'
import Bowser from 'bowser'
import { esm, importMap, umd } from '../src/index.js'
const debug = Debug()

// @ts-expect-error dev
window.testing = { esm, importMap, umd };

(async function () {
    const mainEl = document.querySelector('main')
    const importMapOk = importMap()
    const browserData = Bowser.parse(window.navigator.userAgent)
    console.log('**bowser**', JSON.stringify(browserData, null, 2))

    const { name } = browserData.browser

    const dynamicOk = esm()

    mainEl!.innerHTML = `
        <h1>browser tests</h1>
        <h2>${name}</h2>

        <h3>import map</h3>
        <p>${importMapOk}</p>

        <h3>dynamic imports</h3>
        <p>${dynamicOk}</p>
    `

    if (dynamicOk) {
        let hello
        ({ hello } = await import('./test.js'))

        // testing is kind of janky,
        // because I am just manually testing with one browser (chrome)
        // so dynamic imports *are always supported*, but the IIFE build,
        // for example, does not use esm

        // normally you would not need to do this, because the `dynamicOk`
        // variable tells us if `hello` should be defined.
        if (!hello) {
            debug('not hello, getting UMD version')
            await umd('./test.js')
            hello = globalThis.test.hello
        }

        mainEl!.innerHTML += `<h3>
            output from test.js
        </h3>
        <p>${hello()}</p>`
    } else {
        debug('not dynamic imports, getting UMD version')
        await umd('./test.js')
        mainEl!.innerHTML += `<h3>
            No dynamic imports...
        </h3>
        <p>Using a UMD version...</p>
        `
    }
})()
