import type { ViewComponents } from '$lib/types.js'

import TemporalView from './TemporalView.svelte'

export default {
  'temporal.plaindate': [TemporalView],
  'temporal.plaindatetime': [TemporalView],
  'temporal.plaintime': [TemporalView],
  'temporal.plainmonthday': [TemporalView],
  'temporal.plainyearmonth': [TemporalView],
  'temporal.duration': [TemporalView],
  'temporal.instant': [TemporalView],
  'temporal.zoneddatetime': [TemporalView],
} as ViewComponents
