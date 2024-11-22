import {
  MASTER_DATA_SEGMENTS,
  TMasterDataEquity,
  TMasterDataDerivatives,
  TMasterDataUnderlying,
  TMasterDataDerivativesScript,
  TDerivativesIndex,
  TIsinCodeIndex,
  TScriptIdIndex,
  TSearchStringIndex
} from './Store'

/**
 * ${1:Description placeholder}
 *
 * @template I
 */
export type TIndexHandler<I> = {
  addRow: (
    segmentKey: MASTER_DATA_SEGMENTS,
    itemIndex: number,
    itemData:
      | TMasterDataEquity
      | TMasterDataDerivatives
      | TMasterDataUnderlying,
    derivativeItemIndex?: number,
    derivativeItem?: TMasterDataDerivativesScript
  ) => void
  getIndex: () => I
}

/** ${1:Description placeholder} */
export type TIndexHandlers =
  | [
      TIndexHandler<TScriptIdIndex>,
      TIndexHandler<TIsinCodeIndex>,
      TIndexHandler<TDerivativesIndex>,
      TIndexHandler<TSearchStringIndex>?
    ]
