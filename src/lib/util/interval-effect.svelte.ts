export function intervalEffect(handler: TimerHandler, timeout: number) {
  let interval = $state<number>()
  $effect(() => {
    interval = window.setInterval(handler, timeout)

    return () => {
      window.clearInterval(interval)
    }
  })
}
