import { set, get } from "idb-keyval"

export const offlineStore = {
  async save<T>(key: string, value: T) {
    try {
      await set(key, value)
    } catch {}
  },
  async load<T>(key: string) {
    try {
      return (await get(key)) as T | undefined
    } catch {
      return undefined
    }
  },
}
