/**
 * Are static imports supported?
 *
 * @returns {boolean}
 */
export function staticImport ():boolean {
    try {
        new Function('import("")')  // eslint-disable-line
        return true
    } catch (_err) {
        return false
    }
}

/**
 * Are dynamic imports supported?
 */
export async function dynamicImport (path:string):Promise<boolean> {
    try {
        await import(path)
        return true
    } catch (_err) {
        console.log('errrrrrr', _err)
        return false
    }
}

/**
 * Is `importmap` supported?
 */
export function importMap ():boolean {
    return HTMLScriptElement.supports?.('importmap')
}
