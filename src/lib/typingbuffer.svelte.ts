import { focusBySearch } from './action/focus.svelte.js'

/*
 * Adapted from https://github.com/trbrc/svelte-inspect
 */
let typingBuffer = $state('')
let hasSearchBufferTimeout = $state(false)
let clearBufferTimeout = $state<number | undefined>()
export function type(char: string) {
  typingBuffer += char
  if (!hasSearchBufferTimeout) {
    hasSearchBufferTimeout = true
    setTimeout(() => {
      hasSearchBufferTimeout = false
      focusBySearch(typingBuffer)
    }, 100)
  }
  clearTimeout(clearBufferTimeout)
  clearBufferTimeout = setTimeout(() => {
    typingBuffer = ''
  }, 600)
}

export function typebuffer() {
  return typingBuffer
}

export const typeBufferValue = {
  get current() {
    return typingBuffer
  },
  set current(value) {
    typingBuffer = value
  },
}
