/**
 * Adapted from https://github.com/trbrc/svelte-inspect
 */

import type { Action } from 'svelte/action'

let serialCounter = 0

export const focusTarget: Action<HTMLElement, boolean | undefined> = (element, enabled = true) => {
  if (enabled) {
    // This should probably not be a global serial, but based instead on the scope.
    element.dataset.focusTarget = (serialCounter++).toString()
    const focusEventListener = () => {
      setFocus(element)
    }
    element.addEventListener('focus', focusEventListener)
    return {
      destroy() {
        element.removeEventListener('focus', focusEventListener)
      },
    }
  }
}

export const scope: Action<HTMLElement, boolean | undefined> = (element, enabled = true) => {
  if (enabled) {
    element.dataset.focusScope = ''
  }
}

const createRangeFrom = (element: HTMLElement) => {
  const range = document.createRange()
  range.selectNodeContents(element)
  return range
}

function getElementBefore(referenceElement: HTMLElement, elements: NodeListOf<HTMLElement>) {
  const range = createRangeFrom(referenceElement)
  const lastIndex = elements.length - 1
  for (let i = lastIndex; i >= 0; i--) {
    if (range.comparePoint(elements[i], 0) === -1) {
      return elements[i]
    }
  }
  return elements[lastIndex]
}

function getElementAfter(referenceElement: HTMLElement, elements: NodeListOf<HTMLElement>) {
  const range = createRangeFrom(referenceElement)
  for (let i = 0; i < elements.length; i++) {
    if (range.comparePoint(elements[i], 0) === 1) {
      return elements[i]
    }
  }
  return elements[0]
}

function getTargetBefore(element: HTMLElement) {
  return getElementBefore(element, document.querySelectorAll('[data-focus-target]'))
}

function getTargetAfter(element: HTMLElement) {
  return getElementAfter(element, document.querySelectorAll('[data-focus-target]'))
}

function getParentScope(element: HTMLElement, scopeId?: string) {
  if (scopeId) {
    const outer = document.querySelectorAll<HTMLDivElement>(`[data-focus-id="${scopeId}"]`).item(0)
    if (outer) return outer
  }

  return element.closest('[data-focus-scope]') as HTMLElement | null
}

function getAllFocusTargets(outer: Element) {
  return outer.querySelectorAll<HTMLElement>('[data-focus-target]')
}

function getCurrentFocusContainer(ele: Element, focusId?: string) {
  return ele.closest<HTMLElement>(`[data-focus-id="${focusId}"]`)
}

function setFocus(targetElement: HTMLElement) {
  if (targetElement) {
    const serial = targetElement.dataset.focusTarget
    if (serial) {
      const scope = getParentScope(targetElement)
      if (scope) {
        scope.dataset.focusScope = serial
      }
    }
    targetElement.focus()
    return true
  }
  return false
}

export function focusPrev(focusId: string) {
  if (!document.activeElement) return false
  const outer = getCurrentFocusContainer(document.activeElement, focusId)
  const target = getTargetBefore(document.activeElement as HTMLElement)
  if (outer) {
    if (outer.contains(target)) {
      return setFocus(target)
    }

    return focusLast(focusId)
  }

  return false
}

export function focusNext(focusId: string) {
  if (!document.activeElement) return false
  const outer = getCurrentFocusContainer(document.activeElement, focusId)
  const target = getTargetAfter(document.activeElement as HTMLElement)
  if (outer) {
    if (outer.contains(target)) {
      return setFocus(target)
    }

    return focusFirst(focusId)
  }

  return false
}

export function focusLast(focusId: string) {
  if (!document.activeElement) return false
  const outer = getCurrentFocusContainer(document.activeElement, focusId)
  if (outer) {
    const targets = getAllFocusTargets(outer)
    const last = targets.item(targets.length - 1)
    if (last) return setFocus(last)
  }
  return false
}

export function focusFirst(focusId: string) {
  if (!document.activeElement) return false
  const outer = getCurrentFocusContainer(document.activeElement, focusId)
  if (outer) {
    const targets = getAllFocusTargets(outer)
    const first = targets.item(0)
    if (first) return setFocus(first)
  }
  return false
}

export function exitFocusScope(focusId: string) {
  const outer = document.querySelectorAll<HTMLDivElement>(`[data-focus-id="${focusId}"]`).item(0)

  const parent = getParentScope(document.activeElement as HTMLElement)
  if (parent && outer && outer.contains(parent)) {
    return setFocus(getTargetBefore(parent))
  } else {
    return focusPrev(focusId)
  }
}

export function enterFocusScope() {
  try {
    const nextScope = getElementAfter(
      document.activeElement as HTMLElement,
      document.querySelectorAll('[data-focus-scope]')
    )
    const targetBefore = getTargetBefore(nextScope)
    if (targetBefore !== document.activeElement) {
      // We only want to enter the scope if it is directly after activeElement
      return false
    }
    const serial = nextScope.dataset.focusScope
    const selector = serial ? `[data-focus-target="${serial}"]` : `[data-focus-target]`
    const target = nextScope.querySelector<HTMLElement>(selector)
    return setFocus(target!)
  } catch {
    return false
  }
}

export function focusBySearch(string: string, focusId: string) {
  // Find a focus target that matches the string.
  try {
    const regex = new RegExp(string.split('').join('[^a-z0-9]*.?[^a-z0-9]*'), 'i')

    let scope = document.activeElement as HTMLElement
    const outer = scope.closest(`[data-focus-id="${focusId}"]`)

    do {
      scope = getParentScope(scope.parentElement as HTMLElement) as HTMLElement

      const targets = scope?.querySelectorAll<HTMLElement>('[data-focus-target]')
      for (let i = 0; i < targets?.length; i++) {
        const target = targets[i]
        // check non-preview keys first
        const keyElements = target?.querySelectorAll<HTMLElement>(
          '.key-button:not([data-search-ignore])'
        )
        if (keyElements.length) {
          for (let j = 0; j < keyElements.length; j++) {
            const t = keyElements[j]
            const text = t.textContent ?? ''
            if (regex.test(text) && outer?.contains(target)) {
              return setFocus(target)
            }
          }
        }
        const text = target.textContent ?? ''
        if (regex.test(text) && outer?.contains(target)) {
          return setFocus(target)
        }
      }
    } while (scope)
  } catch (e) {
    console.error('error while setting focus using typebuffer search:', e)
  }
  return false
}
