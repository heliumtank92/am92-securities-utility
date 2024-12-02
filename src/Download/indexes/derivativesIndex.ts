import { TIndexHandler } from '../../TYPES/IndexHandler'
import {
  MASTER_DATA_SEGMENTS,
  TDerivativesIndex,
  TMasterDataDerivatives,
  TMasterDataDerivativesScript,
  TMasterDataEquity,
  TMasterDataUnderlying
} from '../../TYPES/Store'

const FUTURES = ['FUTSTK', 'FUTIDX', 'FUTCUR', 'FUTCOM']
const OPTIONS = ['OPTSTK', 'OPTCUR', 'OPTFUT', 'OPTIDX']

/**
 * Handles indexing of derivatives data by organizing futures and options
 * based on their underlying assets. This is useful for quick lookups and
 * categorization of derivative scripts.
 *
 * @returns {TIndexHandler<TDerivativesIndex>} An object containing methods to add rows to the index
 * and retrieve the indexed data.
 */
export const derivativesIndexHandler = (): TIndexHandler<TDerivativesIndex> => {
  const index: TDerivativesIndex = {}

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
    // if not Derivative return
    if (!derivativeItem) {
      return
    }

    let item: TMasterDataDerivatives = itemData as TMasterDataDerivatives

    const underlying = item[1]
    const scriptId = derivativeItem![0]
    const isAslAllowed = derivativeItem![3]

    // if script is not allowed don't add to any index
    if (isAslAllowed === 'N' || !underlying) {
      return
    }

    if (!index[underlying]) {
      index[underlying] = {
        FUTURES: [],
        OPTIONS: []
      }
    }

    const [_exchange, _segment, instrumentType] = segmentKey.split('_')
    const key: 'FUTURES' | 'OPTIONS' | undefined =
      (FUTURES.includes(instrumentType) && 'FUTURES') ||
      (OPTIONS.includes(instrumentType) && 'OPTIONS') ||
      undefined

    if (key) {
      index[underlying][key].push(scriptId)
    }
  }

  const getIndex = () => index

  return {
    addRow,
    getIndex
  }
}
