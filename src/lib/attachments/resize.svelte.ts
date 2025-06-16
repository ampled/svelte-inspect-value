import type { Attachment } from 'svelte/attachments'
import { on } from 'svelte/events'

export type ResizableDirections = 'right' | 'left' | 'top' | 'bottom'

type ResizeableParams = {
  handles: ResizableDirections[]
  enabled?: boolean
}

export const sizable = (params: () => ResizeableParams): Attachment<HTMLElement> => {
  return (element) => {
    const parentElement = element.parentElement as HTMLElement

    const elementType = 'button'

    const top = document.createElement(elementType)
    top.dataset.dir = 'north'
    top.dataset.axis = 'y'
    top.classList.add('grabber')
    top.classList.add('top')

    const right = document.createElement(elementType)
    right.dataset.dir = 'east'
    right.dataset.axis = 'x'
    right.classList.add('grabber')
    right.classList.add('right')

    const left = document.createElement(elementType)
    left.dataset.dir = 'west'
    left.dataset.axis = 'x'
    left.classList.add('grabber')
    left.classList.add('left')

    const bottom = document.createElement(elementType)
    bottom.dataset.dir = 'south'
    bottom.dataset.axis = 'y'
    bottom.classList.add('grabber')
    bottom.classList.add('bottom')
    ;[top, right, left, bottom].forEach((ele) => (ele.tabIndex = -1))

    const grabbers = {
      bottom,
      left,
      right,
      top,
    }

    const { handles, enabled = true } = params()

    let width = $state<number>()
    let height = $state<number>()
    const xEnabled = $derived(handles.includes('left') || handles.includes('right'))
    const yEnabled = $derived(handles.includes('top') || handles.includes('bottom'))
    let currentDirs: ResizableDirections[] = []
    let active: HTMLDivElement | null = null
    let initialRect: {
      width: number
      height: number
      left: number
      right: number
      top: number
      bottom: number
    } | null = null
    let initialPos: { x: number; y: number } | null = null
    let eventListeners = [] as (() => void)[]

    $effect(() => {
      if (enabled) {
        handles.forEach((dir) => {
          element.appendChild(grabbers[dir])
          eventListeners.push(
            on(grabbers[dir], 'mousedown', onmousedown),
            on(grabbers[dir], 'dblclick', ondoubleclick)
          )
          currentDirs.push(dir)
        })

        eventListeners.push(on(window, 'mousemove', mousemove), on(window, 'mouseup', mouseup))
      }

      return () => {
        eventListeners.forEach((off) => {
          off()
        })
        eventListeners = []
        currentDirs.forEach((dir) => {
          element.removeChild(grabbers[dir])
        })
        currentDirs = []
      }
    })

    $effect(() => {
      if (enabled) {
        if (xEnabled && width != null) {
          if (width == null) {
            element.style.width = ''
          } else {
            element.style.width = `${width}px`
          }
        }
        if (yEnabled) {
          if (height == null) {
            element.style.height = ''
          } else {
            element.style.height = `${height}px`
          }
        }
      }

      return () => {
        element.style.height = ''
        element.style.width = ''
      }
    })

    function onmousedown(event: MouseEvent) {
      active = event.target as HTMLDivElement
      active.classList.add('selected')
      element.classList.add('resizing')
      const rect = element.getBoundingClientRect()
      const parent = parentElement.getBoundingClientRect()
      initialRect = {
        width: rect.width,
        height: rect.height,
        left: rect.left - parent.left,
        right: parent.right - rect.right,
        top: rect.top - parent.top,
        bottom: parent.bottom - rect.bottom,
      }
      initialPos = { x: event.pageX, y: event.pageY }
    }

    function mousemove(event: MouseEvent) {
      if (!active) return
      if (!initialPos) return
      if (!initialRect) return

      const direction = active.dataset.dir as 'east' | 'west' | 'north' | 'south'

      let delta: number
      if (direction.match('east')) {
        delta = event.pageX - initialPos.x
        width = initialRect.width + delta
      }

      if (direction.match('west')) {
        delta = initialPos.x - event.pageX
        width = initialRect.width + delta
      }

      if (direction.match('north')) {
        delta = initialPos.y - event.pageY
        height = initialRect.height + delta
      }

      if (direction.match('south')) {
        delta = event.pageY - initialPos.y
        height = initialRect.height + delta
      }
    }

    function mouseup(_event: MouseEvent) {
      if (!active) return

      active.classList.remove('selected')
      active = null
      initialRect = null
      initialPos = null
      element.classList.remove('resizing')
    }

    function ondoubleclick(event: MouseEvent) {
      const target = event.currentTarget as HTMLDivElement

      const axis = target.dataset.axis as 'x' | 'y'

      if (axis === 'x') {
        width = undefined
      }
      if (axis === 'y') {
        height = undefined
      }
    }
  }
}
