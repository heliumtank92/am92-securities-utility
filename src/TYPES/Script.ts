/** ${1:Description placeholder} */
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

/** ${1:Description placeholder} */
export type TExchange = 'NSE' | 'BSE' | 'MCX' | 'NCDEX'

/** ${1:Description placeholder} */
export type TScript = {
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

/** ${1:Description placeholder} */
export type TScriptPopulate = (keyof TScript)[]
