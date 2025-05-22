/**
 * Dynamic imports?
 */
export function esm ():boolean {
    try {
        // eslint-disable-next-line
        new Function('return import("")')
        return true
    } catch (err) {
        console.log('errrrrr', err)
        return false
    }
}

/**
 * Is `importmap` supported?
 */
export function importMap ():boolean {
    return HTMLScriptElement.supports?.('importmap')
}

/**
 * Load scripts via `<script>` tags.
 */
export async function umd (...files:string[]):Promise<void> {
    await Promise.all(files.map(f => scriptTag(f)))

    // Small delay to ensure scripts are initialized
    await new Promise(resolve => setTimeout(resolve, 50))
}

/**
 * Load a script via script tag
 */
function scriptTag (src:string):Promise<void> {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
        document.head.appendChild(script)
    })
}
