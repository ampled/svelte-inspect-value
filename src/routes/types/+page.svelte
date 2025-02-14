<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const getAllProperties = (object: any) => {
    const enumerableKeys = []
    for (const enumerableKey in object) {
      enumerableKeys.push(enumerableKey)
    }
    return [
      ...new Set([
        ...enumerableKeys,
        ...Object.getOwnPropertyNames(object),
        ...Object.getOwnPropertySymbols(object),
        ...(object['__proto__'] ? ['__proto__'] : []),
      ]),
    ]
  }

  let ele = $state<HTMLDivElement>()

  export function toType(obj: unknown) {
    return [
      {}.toString.call(obj),
      obj?.toString(),
      obj?.constructor.name,
      obj ? getAllProperties(obj) : [],
    ]
  }

  class HAHA {}

  const lol = {
    get haha() {
      return 'haha'
    },
  }

  const descriptor = Object.getOwnPropertyDescriptor(lol, 'haha')

  const value = $derived({
    string: toType('string'),
    number: toType(2),
    bigint: toType(1n),
    object: toType({}),
    class: toType(class ASDF {}),
    instance: toType(new HAHA()),
    map: toType(new Map()),
    array: toType([1, 2, 3, 4]),
    arrowFn: toType(() => {}),
    aarrowFn: toType(async () => {}),
    fn: toType(function () {}),
    undefined: toType(undefined),
    null: toType(null),
    ele: toType(ele),
    descriptor: toType(descriptor),
    descriptorValue: descriptor,
  })
</script>

<div bind:this={ele}></div>

<Inspect {value} />
