<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  const plainDate = Temporal.Now.plainDateISO()
  const plainDateTime = Temporal.Now.plainDateTimeISO()
  const plainTime = Temporal.Now.plainTimeISO()
  const plainMonthDay = $state(plainDate.toPlainMonthDay())
  const plainYearMonth = plainDate.toPlainYearMonth()
  const plainFuture = plainDate.add({ years: 1, months: 2, days: 10, seconds: 2654 })
  const chineseDate = Temporal.PlainDate.from('2021-07-01[u-ca=chinese]')
  const duration = plainDate.until(plainFuture, {
    largestUnit: 'year',
    smallestUnit: 'days',
    roundingMode: 'floor',
  })
  const instant = Temporal.Now.instant()

  // Exact moment with timezone
  const zonedDateTime = Temporal.ZonedDateTime.from('2026-05-20T14:30:00[Europe/Oslo]')
</script>

<div style="padding: 2em">
  <Inspect
    expandLevel={0}
    values={{
      plain: { plainDate, plainDateTime, plainTime, plainMonthDay, plainYearMonth, chineseDate },
      instant,
      zonedDateTime,
      duration,
      date: new Date(),
    }}
  />
</div>
