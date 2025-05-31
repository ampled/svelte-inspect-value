import { sineInOut } from 'svelte/easing'
import type { EasingFunction, TransitionConfig } from 'svelte/transition'

/**
 * Same as splt_css_unit from svelte/internal, but lets you specify the default unit where the
 * original function only uses 'px'
 */
function splitCssUnit(value: number | string, unitIfNumber = 'px'): [number, string] {
  const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/)
  return split ? [parseFloat(split[1]), split[2] || unitIfNumber] : [value as number, unitIfNumber]
}

export interface RotateParams {
  delay?: number
  duration?: number
  easing?: EasingFunction
  opacity?: number
  rotation?: number | string
  x?: number
  y?: number
}

export function rotate(
  node: Element,
  { delay = 0, duration = 250, easing = sineInOut, rotation = 180, opacity = 0 }: RotateParams = {}
): TransitionConfig {
  const style = getComputedStyle(node)
  const target_opacity = +style.opacity
  const od = target_opacity * (1 - opacity)
  const [rotateValue, rotateUnit] = splitCssUnit(rotation, 'deg')
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
      rotate: ${(1 - t) * rotateValue}${rotateUnit};
			opacity: ${target_opacity - od * u}`,
  }
}

export default rotate
