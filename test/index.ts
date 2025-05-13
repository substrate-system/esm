import Bowser from 'bowser'
import { importMap, dynamicImport, staticImport } from '../src/index.js'

(async function () {
    const mainEl = document.querySelector('main')
    const importMapOk = importMap()
    const browser = Bowser.parse(window.navigator.userAgent)
    console.log('bowser', JSON.stringify(browser, null, 2))

    const { name } = browser.browser
    console.log('**browser**', name)

    const dynamic = await dynamicImport()
    const staticOk = staticImport()

    mainEl!.innerHTML = `
        <h1>browser tests</h1>
        <h2>${name}</h2>

        <h3>import map</h3>
        <p>${importMapOk}</p>

        <h3>dynamic imports</h3>
        <p>${dynamic}</p>

        <h3>static imports</h3>
        <p>${staticOk}</p>
    `
})()
