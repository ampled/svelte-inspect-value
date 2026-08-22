<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  let year = $state(2026)
  let japaneseDate = $derived(
    Temporal.PlainDate.from({ year, day: 18, month: 6 }).withCalendar('japanese')
  )

  const plainDate = Temporal.Now.plainDateISO()
  const plainDateTime = Temporal.Now.plainDateTimeISO()
  const plainTime = Temporal.Now.plainTimeISO()
  const plainMonthDay = plainDate.toPlainMonthDay()
  const plainYearMonth = plainDate.toPlainYearMonth()
  const plainFuture = plainDate.add({ years: 1, months: 2, days: 10, seconds: 2654 })
  const chineseDate = Temporal.PlainDate.from('2021-07-01[u-ca=chinese]')
  const duration = plainDate.until(plainFuture, {
    largestUnit: 'year',
    smallestUnit: 'days',
    roundingMode: 'floor',
  })
  const instant = Temporal.Now.instant()
  const zonedDateTime = Temporal.ZonedDateTime.from('2026-05-20T14:30:00[Europe/Oslo]')
</script>

<input type="number" bind:value={year} />

<div style="padding: 2em">
  <Inspect
    expandLevel={1}
    values={{
      plain: {
        plainDate,
        plainDateTime,
        plainTime,
        plainMonthDay,
        plainYearMonth,
        chineseDate,
        japaneseDate,
      },
      instant,
      zonedDateTime,
      duration,
      date: new Date(),
      nested: {
        plain: { plainDate, plainDateTime, plainTime, plainMonthDay, plainYearMonth, chineseDate },
        instant,
        zonedDateTime,
        duration,
        date: new Date(),
      },
    }}
  />
</div>
