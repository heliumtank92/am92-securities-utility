import { STORE_KEYS } from '../Constants/STORE_KEYS'
import { TStore } from '../TYPES/Store'

/**
 * Description placeholder
 *
 * @type {TStore}
 */
let store: TStore = {}

/**
 * Description placeholder
 *
 * @export
 * @param {TStore} inputStore
 */
export function addStore(inputStore: TStore) {
  if (!inputStore) return
  for (const key in inputStore) {
    if (Object.prototype.hasOwnProperty.call(inputStore, key)) {
      switch (key) {
        case STORE_KEYS.MASTER_DATA:
          addMasterData(inputStore[key] as TStore['MASTER_DATA'])
          break
        case STORE_KEYS.SCRIPT_ID_INDEX:
          addScripIdIndexes(inputStore[key] as TStore['SCRIPT_ID_INDEX'])
          break
        case STORE_KEYS.DERIVATIVES_INDEX:
          addDerivativeIndexes(inputStore[key] as TStore['DERIVATIVES_INDEX'])
          break
        case STORE_KEYS.SEARCH_STRING_INDEX:
          addSearchStringIndexes(
            inputStore[key] as TStore['SEARCH_STRING_INDEX']
          )
          break
        case STORE_KEYS.ISIN_CODE_INDEX:
          addIsinCodeIndexex(inputStore[key] as TStore['ISIN_CODE_INDEX'])
          break
        default:
          break
      }
    }
  }
}

/**
 * Description placeholder
 *
 * @export
 * @param {TStore["MASTER_DATA"]} data
 */
export function addMasterData(data: TStore['MASTER_DATA']) {
  store[STORE_KEYS.MASTER_DATA] = data
}

/**
 * Description placeholder
 *
 * @export
 * @param {TStore["SCRIPT_ID_INDEX"]} data
 */
export function addScripIdIndexes(data: TStore['SCRIPT_ID_INDEX']) {
  store[STORE_KEYS.SCRIPT_ID_INDEX] = data
}

/**
 * Description placeholder
 *
 * @export
 * @param {TStore["DERIVATIVES_INDEX"]} data
 */
export function addDerivativeIndexes(data: TStore['DERIVATIVES_INDEX']) {
  store[STORE_KEYS.DERIVATIVES_INDEX] = data
}

/**
 * Description placeholder
 *
 * @export
 * @param {TStore["ISIN_CODE_INDEX"]} data
 */
export function addIsinCodeIndexex(data: TStore['ISIN_CODE_INDEX']) {
  store[STORE_KEYS.ISIN_CODE_INDEX] = data
}
/**
 * Description placeholder
 *
 * @export
 * @param {TStore["SEARCH_STRING_INDEX"]} data
 */
export function addSearchStringIndexes(data: TStore['SEARCH_STRING_INDEX']) {
  store[STORE_KEYS.SEARCH_STRING_INDEX] = data
}

/**
 * Description placeholder
 *
 * @export
 * @returns {TMasterData}
 */
export function getMasterData() {
  return store[STORE_KEYS.MASTER_DATA] || {}
}

/**
 * Description placeholder
 *
 * @export
 * @returns {TScriptIdIndex}
 */
export function getScripIndex() {
  return store[STORE_KEYS.SCRIPT_ID_INDEX] || {}
}

/**
 * Description placeholder
 *
 * @export
 * @returns {TDerivativesIndex}
 */
export function getDerivativeIndex() {
  return store[STORE_KEYS.DERIVATIVES_INDEX] || {}
}

/**
 * Description placeholder
 *
 * @export
 * @returns {TSearchStringIndex}
 */
export function getSearchIndex() {
  return store[STORE_KEYS.SEARCH_STRING_INDEX] || {}
}

/**
 * Description placeholder
 *
 * @export
 * @returns {TIsinCodeIndex}
 */
export function getIsinIndex() {
  return store[STORE_KEYS.ISIN_CODE_INDEX] || {}
}

export default store
