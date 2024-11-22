import { STORE_KEYS } from "../Constants/STORE_KEYS";
import { TStore } from "../TYPES/Store";

let store: TStore = {};

export function addStore(inputStore: TStore) {
  if (!inputStore) return;
  for (const key in inputStore) {
    if (Object.prototype.hasOwnProperty.call(inputStore, key)) {
      switch (key) {
        case STORE_KEYS.MASTER_DATA:
          addMasterData(inputStore[key] as TStore["MASTER_DATA"]);
          break;
        case STORE_KEYS.SCRIPT_ID_INDEX:
          addScripIdIndexes(inputStore[key] as TStore["SCRIPT_ID_INDEX"]);
          break;
        case STORE_KEYS.DERIVATIVES_INDEX:
          addDerivativeIndexes(inputStore[key] as TStore["DERIVATIVES_INDEX"]);
          break;
        case STORE_KEYS.SEARCH_STRING_INDEX:
          addSearchStringIndexes(
            inputStore[key] as TStore["SEARCH_STRING_INDEX"]
          );
          break;
        case STORE_KEYS.ISIN_CODE_INDEX:
          addIsinCodeIndexex(inputStore[key] as TStore["ISIN_CODE_INDEX"]);
          break;
        default:
          break;
      }
    }
  }
}

export function addMasterData(data: TStore["MASTER_DATA"]) {
  store[STORE_KEYS.MASTER_DATA] = data;
}

export function addScripIdIndexes(data: TStore["SCRIPT_ID_INDEX"]) {
  store[STORE_KEYS.SCRIPT_ID_INDEX] = data;
}

export function addDerivativeIndexes(data: TStore["DERIVATIVES_INDEX"]) {
  store[STORE_KEYS.DERIVATIVES_INDEX] = data;
}

export function addIsinCodeIndexex(data: TStore["ISIN_CODE_INDEX"]) {
  store[STORE_KEYS.ISIN_CODE_INDEX] = data;
}
export function addSearchStringIndexes(data: TStore["SEARCH_STRING_INDEX"]) {
  store[STORE_KEYS.SEARCH_STRING_INDEX] = data;
}

export function getMasterData() {
  return store[STORE_KEYS.MASTER_DATA] || {};
}

export function getScripIndex() {
  return store[STORE_KEYS.SCRIPT_ID_INDEX] || {};
}

export function getDerivativeIndex() {
  return store[STORE_KEYS.DERIVATIVES_INDEX] || {};
}

export function getSearchIndex() {
  return store[STORE_KEYS.SEARCH_STRING_INDEX] || {};
}

export function getIsinIndex() {
  return store[STORE_KEYS.ISIN_CODE_INDEX] || {};
}

export default store;
