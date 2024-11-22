/** ${1:Description placeholder} */
type AnyFunction = (...args: any[]) => any

/**
 * ${1:Description placeholder}
 *
 * @template T
 * @param fn
 * @param [cacheLimit=100]
 * @returns
 */
export function memoize<T extends AnyFunction>(
  fn: T,
  cacheLimit: number = 100
): T {
  const cache = new Map<string, ReturnType<T>>()

  return function (...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      // If the key exists, move it to the end to mark it as recently used
      const value = cache.get(key) as ReturnType<T>
      cache.delete(key)
      cache.set(key, value)
      return value
    }

    // If the key doesn't exist, compute the result
    const result = fn(...args)
    cache.set(key, result)

    // Evict the least recently used (first inserted) item if the cache exceeds the limit
    if (cache.size > cacheLimit) {
      const firstKey = cache.keys().next().value
      if (firstKey) cache.delete(firstKey)
    }

    return result
  } as T
}
