import { getChunkIndex } from '../../Constants/SEARCH_WORKER'
import { TIndexHandler } from '../../TYPES/IndexHandler'
import { TScript } from '../../TYPES/Script'
import {
  MASTER_DATA_SEGMENTS,
  TMasterDataDerivatives,
  TMasterDataDerivativesScript,
  TMasterDataEquity,
  TMasterDataUnderlying,
  TScriptIdIndexValue,
  TSearchStringIndex
} from '../../TYPES/Store'

/**
 * ${1:Description placeholder}
 *
 * @returns
 */
export const searchStringIndexHandler =
  (): TIndexHandler<TSearchStringIndex> => {
    const index: TSearchStringIndex = {}

    const addRow = (
      segmentKey: MASTER_DATA_SEGMENTS,
      itemIndex: number,
      itemData:
        | TMasterDataEquity
        | TMasterDataDerivatives
        | TMasterDataUnderlying,
      derivativeItemIndex?: number,
      derivativeItem?: TMasterDataDerivativesScript
    ) => {
      let exchangeSymbol: TScript['exchangeSymbol']
      let searchString: TScript['searchable']
      let searchPriority: TScript['searchPriority']
      let map: TScriptIdIndexValue
      let isAslAllowed: TScript['aslAllowed']

      if (segmentKey.includes('EQUITY')) {
        const item = itemData as TMasterDataEquity
        exchangeSymbol = item[4]
        isAslAllowed = item[3]
        searchString = item[13]
        searchPriority = item[14]
        map = [segmentKey, itemIndex]
      } else if (segmentKey.includes('UNDERLYING')) {
        const item = itemData as TMasterDataUnderlying
        exchangeSymbol = item[4]
        isAslAllowed = item[3]
        searchString = item[11]
        searchPriority = item[12]
        map = [segmentKey, itemIndex]
      } else {
        const item = itemData as TMasterDataDerivatives
        exchangeSymbol = item[0]
        isAslAllowed = derivativeItem![3]
        searchString = derivativeItem![12]
        searchPriority = derivativeItem![13]
        map = [segmentKey, itemIndex, 3, derivativeItemIndex!]
      }

      if (isAslAllowed === 'N') return

      const searchObj = {
        exchangeSymbol,
        searchString,
        searchPriority,
        data: map
      }

      const chunkIndex = getChunkIndex(searchPriority)
      if (!index[chunkIndex]) {
        index[chunkIndex] = []
      }
      index[chunkIndex].push(searchObj)
    }

    const getIndex = () => index

    return {
      addRow,
      getIndex
    }
  }
