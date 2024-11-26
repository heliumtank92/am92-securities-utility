/**
 * Represents the possible instrument types for financial assets.
 *
 * @type {TInstrumentType}
 * @enum
 */
export type TInstrumentType =
  | 'EQUITY'
  | 'FUTSTK'
  | 'FUTIDX'
  | 'OPTIDX'
  | 'OPTSTK'
  | 'FUTCUR'
  | 'OPTCUR'
  | 'OPTFUT'
  | 'FUTCOM'
  | 'UNDERLYING'

/**
 * Represents the possible exchanges where financial instruments can be traded.
 *
 * @type {TExchange}
 * @enum
 */
export type TExchange = 'NSE' | 'BSE' | 'MCX' | 'NCDEX'

/**
 * Interface representing a financial script, which contains various details related to a specific instrument in a given exchange and segment.
 *
 * @interface IScript
 */
export interface IScript {
  segment: string
  exchange: TExchange
  instrumentType: TInstrumentType

  scriptId: number // TODO: Change spelling in our code
  odinTokenId: number
  aslAllowed: string
  coName: string // TODO: Change spelling in our code
  nriAllowed: string | null
  exchangeSymbol: string | null
  assetClass: string | null
  searchPriority: number | null

  exchangeSecurityId: number
  lotSize: number | null // TODO: Change spelling in our code
  tickSize: number | null // TODO: Change spelling in our code
  closePrice: number | null // TODO: Change spelling in our code
  searchable: string
  yesterdayOpenInt: number | null
  underlying: number | null // TODO: Change spelling in our code
  asmFlag: string | null // TODO: Change spelling in our code
  odinLlfcSegmentId: number // TODO: Change spelling in our code
  cmotsCoCode: number // TODO: Change spelling in our code
  dprLow: number // TODO: Change spelling in our code
  dprHigh: number // TODO: Change spelling in our code
  fiftyTwoWeekLow: number // TODO: Change spelling in our code
  fiftyTwoWeekHigh: number // TODO: Change spelling in our code

  // Equity & Derivatives Extra fields
  maxSingleOrderQty?: number | null

  // Equity Extra fields
  exchangeSeries?: string
  isinCode?: string | null

  // Derivatives Extra fields
  expiryDate?: string
  strikePrice?: number
  optionType?: string
}

/**
 * A type representing the keys of the IScript interface that are used to populate or extract specific fields of a script.
 *
 * @type {TScriptPopulate}
 */
export type TScriptPopulate = (keyof IScript)[]
