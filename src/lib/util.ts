import type { Action } from "svelte/action";

export function getType(value: unknown) {
    const t = typeOf(value);
    if (typeof value === 'function') {
        if (value.toString().startsWith('class') || value.toLocaleString().startsWith('class')) {
            return 'class';
        } else {
            return 'function';
        }
    }
    return t;

    // if (value === null) {
    //     return 'null';
    // } else if (Array.isArray(value)) {
    //     return 'array'
    // } else if (typeof value === 'function') {
    //     if (value.toString().startsWith('class') || value.toLocaleString().startsWith('class')) {
    //         return 'class';
    //     } else {
    //         return 'function';
    //     }
    // } else {
    //     return typeOf(value);
    // }
}

export type ValueType = ReturnType<typeof getType>

function typeofasfcuntion(value: unknown) {
    return typeof value;
}

export type VType = ReturnType<typeof typeofasfcuntion> | 'regexp' | 'date' | 'class' | 'error' | 'array' | 'null' | 'set' | 'map' | 'url' | 'urlsearchparams'

export function stringify(value: unknown, indent = 2) {
    return JSON.stringify(value, (key, value) => {
        if (typeof value === 'bigint') {
            try {
                JSON.stringify(value)
            } catch (e: unknown) {
                if (e instanceof Error) {
                    return 'Caught ' + e.name + ': ' + e.message
                }
                return JSON.stringify(e)

            }
            return '< escaped bigint to avoid TypeError >'
        }
        return value;

    }, indent)
}

// source: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612#7390612
function typeOf(obj: unknown): VType {
    return ({}.toString.call(obj).match(/\s([a-zA-Z]+)/)?.[1].toLowerCase() ?? 'undefined') as unknown as VType;
    //   .call(obj)
    //   .match(/\s([a-zA-Z]+)/)[1]
    //   .toLowerCase()
}

export function isLast(arr: any[], el: any) {
    return arr.length - 1 === arr.findIndex(ele => ele === el);
}

export const noopAction: Action<HTMLElement, any> = (el) => { };