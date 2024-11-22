import {
  CONTENT_HASH_HEADER_KEY_NAME,
  DEFAULT_CACHE_EXPIRATION_TIME,
  DEFAULT_CACHE_NAME
} from '../../Constants/DOWNLOAD'
import { TMasterData } from '../../TYPES/Store'

/**
 * ${1:Description placeholder}
 *
 * @async
 * @param value
 * @param [cacheExpirationTime=DEFAULT_CACHE_EXPIRATION_TIME]
 * @returns
 */
export async function setCacheContentHash(
  value: string,
  cacheExpirationTime: number = DEFAULT_CACHE_EXPIRATION_TIME
) {
  const responseOptions = {
    headers: new Headers({
      'Cache-Control': `max-age=${cacheExpirationTime}`
    })
  }

  const key = 'lastContentHash'
  const cache = await caches.open(DEFAULT_CACHE_NAME)
  const cacheResponse = new Response(value, responseOptions)
  await cache.put(key, cacheResponse)
}

/**
 * ${1:Description placeholder}
 *
 * @async
 * @returns
 */
export async function getLastCachedContentHash() {
  const key = 'lastContentHash'
  const cache = await caches.open(DEFAULT_CACHE_NAME)
  const cacheResponse = await cache.match(key)
  const value = await cacheResponse?.text()

  return value
}

/**
 * ${1:Description placeholder}
 *
 * @async
 * @param contentHash
 * @returns
 */
export async function checkIfContentHashIsSame(contentHash: string) {
  const oldContentHash = await getLastCachedContentHash()
  return oldContentHash === contentHash
}

/**
 * ${1:Description placeholder}
 *
 * @param headers
 * @returns
 */
export function getContentHashFromHeaders(headers: any) {
  if (headers) return headers[CONTENT_HASH_HEADER_KEY_NAME]

  return ''
}

/**
 * ${1:Description placeholder}
 *
 * @async
 * @param secMasterURL
 * @returns
 */
export async function getCacheResponse(secMasterURL: string) {
  const cache = await caches.open(DEFAULT_CACHE_NAME)
  const cacheResponse = await cache.match(secMasterURL)
  if (cacheResponse) {
    return await cacheResponse.json()
  }
}

/**
 * ${1:Description placeholder}
 *
 * @async
 * @param secMasterURL
 * @param SEC_MASTER_ARRAY
 * @returns
 */
export async function setCacheResponse(
  secMasterURL: string,
  SEC_MASTER_ARRAY: TMasterData
) {
  const cache = await caches.open(DEFAULT_CACHE_NAME)

  const responseOptions = {
    headers: new Headers({
      'Cache-Control': `max-age=${DEFAULT_CACHE_EXPIRATION_TIME}`
    })
  }

  const cacheResponse = new Response(
    JSON.stringify(SEC_MASTER_ARRAY),
    responseOptions
  )
  await cache.put(secMasterURL, cacheResponse)
}
