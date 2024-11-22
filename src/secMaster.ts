import {
  getDerivativeIndex,
  getIsinIndex,
  getMasterData,
  getScripIndex
} from './store/index'
import { TScript, TScriptPopulate } from './TYPES/Script'
import {
  MASTER_DATA_SEGMENTS,
  TMasterDataDerivatives,
  TMasterDataEquity,
  TMasterDataUnderlying,
  TScriptIdIndexValue
} from './TYPES/Store'
import { memoize } from './Utils/memoized'

/**
 * ${1:Description placeholder}
 *
 * @param scriptId
 * @param [populate]
 * @returns
 */
const _getScripByScripId = (
  scriptId: TScript['scriptId'],
  populate?: TScriptPopulate
) => {
  const scriptIdIndex = getScripIndex()

  if (!scriptIdIndex) {
    // TODO: Beautify
    console.warn('ScriptIdIndex not found in store')
    return
  }

  const locations = scriptIdIndex[scriptId]

  if (!locations) {
    return
  }

  return getScriptByScriptIdIndexValue(locations, populate)
}

/** ${1:Description placeholder} */
export const getScripByScripId = memoize(_getScripByScripId, 100)

/**
 * ${1:Description placeholder}
 *
 * @param scriptIds
 * @param [populate]
 * @returns
 */
export const getScripsByScripIds = (
  scriptIds: TScript['scriptId'][],
  populate?: TScriptPopulate
) => {
  if (!scriptIds) {
    return []
  }

  const scripts = scriptIds
    .map(scriptId => getScripByScripId(scriptId, populate))
    .filter(script => script !== undefined)
  return scripts
}

/**
 * ${1:Description placeholder}
 *
 * @param isinCode
 * @param [populate]
 * @returns
 */
export const getScripsByIsinCode = (
  isinCode: TScript['isinCode'],
  populate?: TScriptPopulate
) => {
  const isinCodeIndex = getIsinIndex()

  if (!isinCode) {
    return []
  }

  if (!isinCodeIndex) {
    // TODO: Beautify
    console.warn('isinCodeIndex not found in store')
    return
  }

  const scriptIds = isinCodeIndex[isinCode]
  return getScripsByScripIds(scriptIds, populate)
}

/**
 * ${1:Description placeholder}
 *
 * @param scriptId
 * @param [derivativeType="BOTH"]
 * @param [populate]
 * @returns
 */
export const getDerivativeScripsByScripId = (
  scriptId: TScript['scriptId'],
  derivativeType: 'FUTURES' | 'OPTIONS' | 'BOTH' = 'BOTH',
  populate?: TScriptPopulate
) => {
  const script = getScripByScripId(scriptId, populate)

  if (!script) {
    return {}
  }

  const { underlying, isinCode, exchange, instrumentType } = script

  let underlyingId: TScript['underlying'] = underlying
  if (!underlyingId) {
    if (exchange === 'NSE' && instrumentType === 'EQUITY') {
      underlyingId = scriptId
    }

    if (!isinCode) {
      return {}
    }

    const isinCodeIndex = getIsinIndex()
    if (!isinCodeIndex) {
      // TODO: Beautify
      console.warn('isinCodeIndex not found in store')
      return {}
    }

    if (exchange === 'BSE') {
      const scriptIds = isinCodeIndex && isinCodeIndex[isinCode]
      const nseScriptId = scriptIds.filter(
        scriptIdentifier => scriptIdentifier !== scriptId
      )[0]
      underlyingId = nseScriptId
    }
  }

  const derivativesIndex = getDerivativeIndex()
  if (!derivativesIndex) {
    // TODO: Beautify
    console.warn('derivativesIndex not found in store')
    return {}
  }

  const derivativesScriptIdsObj =
    (underlyingId && derivativesIndex[underlyingId]) || null

  if (derivativesScriptIdsObj) {
    if (derivativeType === 'BOTH') {
      return {
        FUTURES: getScripsByScripIds(derivativesScriptIdsObj.FUTURES, populate),
        OPTIONS: getScripsByScripIds(derivativesScriptIdsObj.OPTIONS, populate)
      }
    } else if (derivativeType === 'FUTURES') {
      return {
        FUTURES: getScripsByScripIds(derivativesScriptIdsObj.FUTURES, populate)
      }
    } else {
      return {
        OPTIONS: getScripsByScripIds(derivativesScriptIdsObj.OPTIONS, populate)
      }
    }
  }
}

/**
 * ${1:Description placeholder}
 *
 * @param scriptIdIndexValue
 * @param [populate=[]]
 * @returns
 */
export const getScriptByScriptIdIndexValue = (
  scriptIdIndexValue: TScriptIdIndexValue,
  populate: TScriptPopulate = []
): TScript | undefined | Pick<TScript, TScriptPopulate[number]> => {
  const { instrumentType } = _getSegmentDetails(scriptIdIndexValue[0])

  let script: TScript | undefined
  if (instrumentType === 'EQUITY') {
    script = _mapFlattenEquityScriptToScript(scriptIdIndexValue)
  } else if (instrumentType === 'UNDERLYING') {
    script = _mapFlattenUnderlingScriptToScript(scriptIdIndexValue)
  } else {
    script = _mapFlattenDerivativeScriptToScript(scriptIdIndexValue)
  }

  if (populate.length && script) {
    const scriptObj = Object.fromEntries(
      populate.filter(key => key in script).map(key => [key, script[key]])
    ) as Pick<TScript, keyof TScript>
    return scriptObj
  }

  return script
}

/**
 * ${1:Description placeholder}
 *
 * @param masterDataSegment
 * @returns
 */
const _getSegmentDetails = (masterDataSegment: MASTER_DATA_SEGMENTS) => {
  const [exchange, segment, instrumentType] = masterDataSegment.split('_') as [
    TScript['exchange'],
    TScript['segment'],
    TScript['instrumentType']
  ]
  const scriptObj: Pick<TScript, 'segment' | 'exchange' | 'instrumentType'> = {
    segment,
    exchange,
    instrumentType
  }
  return scriptObj
}

/**
 * ${1:Description placeholder}
 *
 * @param locations
 * @returns
 */
const _mapFlattenEquityScriptToScript = (locations: TScriptIdIndexValue) => {
  const masterData = getMasterData()

  if (!masterData) {
    // TODO: Beautify
    console.warn('masterData not found in store')
    return
  }

  const [masterDataSegment, scriptIndex] = locations

  const { segment, exchange, instrumentType } =
    _getSegmentDetails(masterDataSegment)

  const segmentData = masterData[masterDataSegment] as TMasterDataEquity[]
  const flattenEquityScript = segmentData[scriptIndex]

  const [
    scriptId,
    odinTokenId,
    exchangeSecurityId,
    aslAllowed,
    exchangeSymbol,
    exchangeSeries,
    isinCode,
    coName,
    lotSize,
    tickSize,
    nriAllowed,
    closePrice,
    assetClass,
    searchable,
    searchPriority,
    yesterdayOpenInt,
    maxSingleOrderQty,
    underlying,
    asmFlag,
    odinLlfcSegmentId,
    cmotsCoCode,
    dprLow,
    dprHigh,
    fiftyTwoWeekLow,
    fiftyTwoWeekHigh
  ] = flattenEquityScript

  const scriptObj: TScript = {
    segment,
    exchange,
    instrumentType,
    scriptId,
    odinTokenId,
    exchangeSecurityId,
    aslAllowed,
    exchangeSymbol,
    exchangeSeries,
    isinCode,
    coName,
    lotSize,
    tickSize,
    nriAllowed,
    closePrice,
    assetClass,
    searchable,
    searchPriority,
    yesterdayOpenInt,
    maxSingleOrderQty,
    underlying,
    asmFlag,
    odinLlfcSegmentId,
    cmotsCoCode,
    dprLow,
    dprHigh,
    fiftyTwoWeekLow,
    fiftyTwoWeekHigh
  }

  return scriptObj
}

/**
 * ${1:Description placeholder}
 *
 * @param locations
 * @returns
 */
const _mapFlattenUnderlingScriptToScript = (locations: TScriptIdIndexValue) => {
  const masterData = getMasterData()

  if (!masterData) {
    // TODO: Beautify
    console.warn('masterData not found in store')
    return
  }

  const [masterDataSegment, scriptIndex] = locations

  const { segment, exchange, instrumentType } =
    _getSegmentDetails(masterDataSegment)

  const segmentData = masterData[masterDataSegment] as TMasterDataUnderlying[]
  const flattenEquityScript = segmentData[scriptIndex]

  const [
    scriptId,
    odinTokenId,
    exchangeSecurityId,
    aslAllowed,
    exchangeSymbol,
    coName,
    lotSize,
    tickSize,
    nriAllowed,
    closePrice,
    assetClass,
    searchable,
    searchPriority,
    yesterdayOpenInt,
    underlying,
    asmFlag,
    odinLlfcSegmentId,
    cmotsCoCode,
    dprLow,
    dprHigh,
    fiftyTwoWeekLow,
    fiftyTwoWeekHigh
  ] = flattenEquityScript

  const scriptObj: TScript = {
    segment,
    exchange,
    instrumentType,
    scriptId,
    odinTokenId,
    exchangeSecurityId,
    aslAllowed,
    exchangeSymbol,
    coName,
    lotSize,
    tickSize,
    nriAllowed,
    closePrice,
    assetClass,
    searchable,
    searchPriority,
    yesterdayOpenInt,
    underlying,
    asmFlag,
    odinLlfcSegmentId,
    cmotsCoCode,
    dprLow,
    dprHigh,
    fiftyTwoWeekLow,
    fiftyTwoWeekHigh
  }

  return scriptObj
}

/**
 * ${1:Description placeholder}
 *
 * @param locations
 * @returns
 */
const _mapFlattenDerivativeScriptToScript = (
  locations: TScriptIdIndexValue
) => {
  const masterData = getMasterData()

  if (!masterData) {
    // TODO: Beautify
    console.warn('masterData not found in store')
    return
  }

  const [
    masterDataSegment,
    scriptIndex,
    derivativesIndex,
    derivativesScriptIndex
  ] = locations

  const { segment, exchange, instrumentType } =
    _getSegmentDetails(masterDataSegment)

  const segmentData = masterData[masterDataSegment] as TMasterDataDerivatives[]
  const flattenDerivative = segmentData[scriptIndex]
  const [exchangeSymbol, _, assetClass, flattenDerivativeScripts] =
    flattenDerivative
  const flattenDerivativeScript =
    flattenDerivativeScripts[derivativesScriptIndex!]

  if (flattenDerivativeScript) {
    const [
      scriptId,
      odinTokenId,
      exchangeSecurityId,
      aslAllowed,
      coName,
      expiryDate,
      strikePrice,
      optionType,
      lotSize,
      tickSize,
      nriAllowed,
      closePrice,
      searchable,
      searchPriority,
      yesterdayOpenInt,
      maxSingleOrderQty,
      underlying,
      asmFlag,
      odinLlfcSegmentId,
      cmotsCoCode,
      dprLow,
      dprHigh,
      fiftyTwoWeekLow,
      fiftyTwoWeekHigh
    ] = flattenDerivativeScript

    const scriptObj: TScript = {
      segment,
      exchange,
      instrumentType,
      exchangeSymbol,
      assetClass,
      scriptId,
      odinTokenId,
      exchangeSecurityId,
      aslAllowed,
      coName,
      expiryDate,
      strikePrice,
      optionType,
      lotSize,
      tickSize,
      nriAllowed,
      closePrice,
      searchable,
      searchPriority,
      yesterdayOpenInt,
      maxSingleOrderQty,
      underlying,
      asmFlag,
      odinLlfcSegmentId,
      cmotsCoCode,
      dprLow,
      dprHigh,
      fiftyTwoWeekLow,
      fiftyTwoWeekHigh
    }

    return scriptObj
  }
}
