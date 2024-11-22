import { IWorkerConstantsOptions } from '../TYPES/SearchWorker'

/** ${1:Description placeholder} */
export const WORKER_CHUNK_ONE = { min: 1, max: 25000, chunkIndex: 0 } // EQUITY
/** ${1:Description placeholder} */
export const WORKER_CHUNK_TWO = { min: 25001, max: 125000, chunkIndex: 1 } // FUTURE
/** ${1:Description placeholder} */
export const WORKER_CHUNK_THREE = { min: 125001, max: 150000, chunkIndex: 2 } // OPTIONS
/** ${1:Description placeholder} */
export const WORKER_CHUNK_FOUR = { min: 150001, max: 199999, chunkIndex: 3 } // UNDERLYING

/** ${1:Description placeholder} */
export const WORKER_CHUNK_META = [
  WORKER_CHUNK_ONE,
  WORKER_CHUNK_TWO,
  WORKER_CHUNK_THREE,
  WORKER_CHUNK_FOUR
]

/** ${1:Description placeholder} */
const DEFAULT_CHUNK_PRIORITY = 100

/**
 * ${1:Description placeholder}
 *
 * @param priority
 * @returns
 */
export function getChunkIndex(priority: number | null) {
  const searchPriority = priority || DEFAULT_CHUNK_PRIORITY

  if (
    searchPriority >= WORKER_CHUNK_ONE.min &&
    searchPriority <= WORKER_CHUNK_ONE.max
  ) {
    return WORKER_CHUNK_ONE.chunkIndex
  } else if (
    searchPriority >= WORKER_CHUNK_TWO.min &&
    searchPriority <= WORKER_CHUNK_TWO.max
  ) {
    return WORKER_CHUNK_TWO.chunkIndex
  } else if (
    searchPriority >= WORKER_CHUNK_THREE.min &&
    searchPriority <= WORKER_CHUNK_THREE.max
  ) {
    return WORKER_CHUNK_THREE.chunkIndex
  } else {
    return WORKER_CHUNK_FOUR.chunkIndex
  }
}

/** ${1:Description placeholder} */
export const MAX_FUSE_CHUNK_SIZE = 20000

/** ${1:Description placeholder} */
export const SEARCH_OPTIONS = {
  keys: ['searchString', 'exchangeSymbol'],
  limit: 40, // don't return more results than you need!
  threshold: -999, // don't return bad results,
  scoreFn: (a: any) => {
    const searchStringScore = (a[0] ? a[0].score : -1000) * 0.1
    const exchangeSymbolScore = (a[1] ? a[1].score : -1000) * 0.9
    return searchStringScore + exchangeSymbolScore
  }
}

/** ${1:Description placeholder} */
export const WORKER_CONSTANTS_OPTIONS: IWorkerConstantsOptions = {
  init: 'INITIALIZE',
  start: 'START',
  search: 'SEARCH',
  terminate: 'TERMINATE'
}
