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
export async function dynamicImport ():Promise<boolean> {
    try {
        // @ts-expect-error feature detection
        await import('')
        return true
    } catch (_err) {
        return false
    }
}

/**
 * Is `importmap` supported?
 */
export function importMap ():boolean {
    return HTMLScriptElement.supports?.('importmap')
}
