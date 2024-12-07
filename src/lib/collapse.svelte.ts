import type { KeyName } from './types.js'

export type EntryState = {
  collapsed?: boolean
}

export type Entry = {
  id: string
  state: EntryState
  children: Entry[]
}

export function findByPath(route: KeyName[], entries: Entry[]): Entry | undefined {
  const path = pathToString(route)

  const entry = entries.find((e) => e.id === path[0])

  if (route.length === 0) return entry

  return entry ? findByPath(path.slice(1), entry.children) : undefined
}

const pathToString = (path: KeyName[]) => path.map(String)

export function findNode(id: string, array: Entry[]): Entry | undefined {
  for (const node of array) {
    if (node.id === id) return node
    if (node.children) {
      const child = findNode(id, node.children)
      if (child) return child
    }
  }
}

export class Collapse {
  #value = $state<Entry[]>([])

  constructor(
    init: Entry[],
    private name: string
  ) {
    this.#value = init

    // $inspect(this.#value);
  }

  save() {
    if (this.#value != null && Object.entries(this.#value).length) {
      const v = JSON.stringify(this.#value)
      localStorage.setItem(this.name, v)
    }
  }

  addSelf(path: KeyName[]) {
    const search = path.slice(0, path.length - 1)
    const lastKey = path[path.length - 1]
    // console.log('addSelf', {path, lastKey});
    // console.log
    const existingNode = findByPath(search, this.#value)
    if (existingNode) {
      console.log('!!! EXISTING NODE !!!', existingNode)
    }
    const newNode: Entry = { id: String(lastKey), state: { collapsed: true }, children: [] }
    if (existingNode) {
      existingNode.children = [...existingNode.children, newNode]
    } else {
      this.#value.push(newNode)
    }
  }
}
