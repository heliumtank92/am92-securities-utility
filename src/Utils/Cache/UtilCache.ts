import {
  CONTENT_HASH_HEADER_KEY_NAME,
  DEFAULT_CACHE_EXPIRATION_TIME,
  DEFAULT_CACHE_NAME,
} from "../../Constants/DOWNLOAD";
import { TMasterData } from "../../TYPES/Store";

export async function setCacheContentHash(
  value: string,
  cacheExpirationTime: number = DEFAULT_CACHE_EXPIRATION_TIME
) {
  const responseOptions = {
    headers: new Headers({
      "Cache-Control": `max-age=${cacheExpirationTime}`,
    }),
  };

  const key = "lastContentHash";
  const cache = await caches.open(DEFAULT_CACHE_NAME);
  const cacheResponse = new Response(value, responseOptions);
  await cache.put(key, cacheResponse);
}

export async function getLastCachedContentHash() {
  const key = "lastContentHash";
  const cache = await caches.open(DEFAULT_CACHE_NAME);
  const cacheResponse = await cache.match(key);
  const value = await cacheResponse?.text();

  return value;
}

export async function checkIfContentHashIsSame(contentHash: string) {
  const oldContentHash = await getLastCachedContentHash();
  return oldContentHash === contentHash;
}

export function getContentHashFromHeaders(headers: any) {
  if (headers) return headers[CONTENT_HASH_HEADER_KEY_NAME];

  return "";
}

export async function getCacheResponse(secMasterURL: string) {
  const cache = await caches.open(DEFAULT_CACHE_NAME);
  const cacheResponse = await cache.match(secMasterURL);
  if (cacheResponse) {
    return await cacheResponse.json();
  }
}

export async function setCacheResponse(
  secMasterURL: string,
  SEC_MASTER_ARRAY: TMasterData
) {
  const cache = await caches.open(DEFAULT_CACHE_NAME);

  const responseOptions = {
    headers: new Headers({
      "Cache-Control": `max-age=${DEFAULT_CACHE_EXPIRATION_TIME}`,
    }),
  };

  const cacheResponse = new Response(
    JSON.stringify(SEC_MASTER_ARRAY),
    responseOptions
  );
  await cache.put(secMasterURL, cacheResponse);
}
