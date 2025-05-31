import { cubicOut } from 'svelte/easing'
import type { SlideParams, TransitionConfig } from 'svelte/transition'

export function slideXY(
  node: Element,
  { delay = 0, duration = 400, easing = cubicOut }: SlideParams = {}
): TransitionConfig {
  const style = getComputedStyle(node)

  // const opacity = +style.opacity
  const height_property_value = parseFloat(style['height'])
  const width_property_value = parseFloat(style['width'])

  const paddingValues = {
    top: parseFloat(style['paddingTop']),
    bottom: parseFloat(style['paddingBottom']),
    right: parseFloat(style['paddingRight']),
    left: parseFloat(style['paddingLeft']),
  }
  const marginValues = {
    top: parseFloat(style['marginTop']),
    bottom: parseFloat(style['marginBottom']),
    right: parseFloat(style['marginRight']),
    left: parseFloat(style['marginLeft']),
  }
  const borderValues = {
    top: parseFloat(style['borderTopWidth']),
    bottom: parseFloat(style['borderBottomWidth']),
    right: parseFloat(style['borderRightWidth']),
    left: parseFloat(style['borderLeftWidth']),
  }

  return {
    delay,
    duration,
    easing,
    css: (t) => {
      return (
        'overflow: hidden;' +
        `width: ${t * width_property_value}px;` +
        `height: ${t * height_property_value}px;` +
        `padding-top: ${t * paddingValues.top}px;` +
        `padding-bottom: ${t * paddingValues.bottom}px;` +
        `padding-right: ${t * paddingValues.right}px;` +
        `padding-left: ${t * paddingValues.left}px;` +
        `margin-top: ${t * marginValues.top}px;` +
        `margin-bottom: ${t * marginValues.bottom}px;` +
        `margin-right: ${t * marginValues.right}px;` +
        `margin-left: ${t * marginValues.left}px;` +
        `border-top-width: ${t * borderValues.top}px;` +
        `border-bottom-width: ${t * borderValues.bottom}px;` +
        `border-right-width: ${t * borderValues.right}px;` +
        `min-height: 0;` +
        `min-width: 0`
      )
    },
  }
}
