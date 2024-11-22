import { TIndexHandler } from '../../TYPES/IndexHandler'
import {
  MASTER_DATA_SEGMENTS,
  TDerivativesIndex,
  TMasterDataDerivatives,
  TMasterDataDerivativesScript,
  TMasterDataEquity,
  TMasterDataUnderlying
} from '../../TYPES/Store'

/** ${1:Description placeholder} */
const FUTURES = ['FUTSTK', 'FUTIDX', 'FUTCUR', 'FUTCOM']
/** ${1:Description placeholder} */
const OPTIONS = ['OPTSTK', 'OPTCUR', 'OPTFUT', 'OPTIDX']

/**
 * ${1:Description placeholder}
 *
 * @returns
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
