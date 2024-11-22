import { STORE_KEYS } from "../Constants/STORE_KEYS";
import { TScript } from "./Script";

export enum MASTER_DATA_SEGMENTS {
  NSE_EQ_EQUITY = "NSE_EQ_EQUITY",
  BSE_EQ_EQUITY = "BSE_EQ_EQUITY",
  NSE_FO_FUTSTK = "NSE_FO_FUTSTK",
  NSE_FO_FUTIDX = "NSE_FO_FUTIDX",
  NSE_FO_OPTIDX = "NSE_FO_OPTIDX",
  NSE_FO_OPTSTK = "NSE_FO_OPTSTK",
  NSE_CURR_FUTCUR = "NSE_CURR_FUTCUR",
  NSE_CURR_OPTCUR = "NSE_CURR_OPTCUR",
  MCX_COMM_OPTFUT = "MCX_COMM_OPTFUT",
  MCX_COMM_FUTCOM = "MCX_COMM_FUTCOM",
  NCDEX_COMM_OPTFUT = "NCDEX_COMM_OPTFUT",
  NCDEX_COMM_FUTCOM = "NCDEX_COMM_FUTCOM",
  NSE_CURR_UNDERLYING = "NSE_CURR_UNDERLYING",
  MCX_COMM_UNDERLYING = "MCX_COMM_UNDERLYING",
  NCDEX_COMM_UNDERLYING = "NCDEX_COMM_UNDERLYING",
  NSE_EQ_UNDERLYING = "NSE_EQ_UNDERLYING",
  BSE_EQ_UNDERLYING = "BSE_EQ_UNDERLYING",
}

export type TMasterDataSegmentKeys = keyof typeof MASTER_DATA_SEGMENTS;

type TScriptId = TScript["scriptId"];

export type TMasterDataEquity = [
  TScriptId,
  TScript["odinTokenId"],
  TScript["exchangeSecurityId"],
  TScript["aslAllowed"],
  TScript["exchangeSymbol"],
  TScript["exchangeSeries"],
  TScript["isinCode"],
  TScript["coName"],
  TScript["lotSize"],
  TScript["tickSize"],
  TScript["nriAllowed"],
  TScript["closePrice"],
  TScript["assetClass"],
  TScript["searchable"],
  TScript["searchPriority"],
  TScript["yesterdayOpenInt"],
  TScript["maxSingleOrderQty"],
  TScript["underlying"],
  TScript["asmFlag"],
  TScript["odinLlfcSegmentId"],
  TScript["cmotsCoCode"],
  TScript["dprLow"],
  TScript["dprHigh"],
  TScript["fiftyTwoWeekLow"],
  TScript["fiftyTwoWeekHigh"]
];

export type TMasterDataUnderlying = [
  TScriptId,
  TScript["odinTokenId"],
  TScript["exchangeSecurityId"],
  TScript["aslAllowed"],
  TScript["exchangeSymbol"],
  TScript["coName"],
  TScript["lotSize"],
  TScript["tickSize"],
  TScript["nriAllowed"],
  TScript["closePrice"],
  TScript["assetClass"],
  TScript["searchable"],
  TScript["searchPriority"],
  TScript["yesterdayOpenInt"],
  TScript["underlying"],
  TScript["asmFlag"],
  TScript["odinLlfcSegmentId"],
  TScript["cmotsCoCode"],
  TScript["dprLow"],
  TScript["dprHigh"],
  TScript["fiftyTwoWeekLow"],
  TScript["fiftyTwoWeekHigh"]
];

export type TMasterDataDerivativesScript = [
  TScriptId,
  TScript["odinTokenId"],
  TScript["exchangeSecurityId"],
  TScript["aslAllowed"],
  TScript["coName"],
  TScript["expiryDate"],
  TScript["strikePrice"],
  TScript["optionType"],
  TScript["lotSize"],
  TScript["tickSize"],
  TScript["nriAllowed"],
  TScript["closePrice"],
  TScript["searchable"],
  TScript["searchPriority"],
  TScript["yesterdayOpenInt"],
  TScript["maxSingleOrderQty"],
  TScript["underlying"],
  TScript["asmFlag"],
  TScript["odinLlfcSegmentId"],
  TScript["cmotsCoCode"],
  TScript["dprLow"],
  TScript["dprHigh"],
  TScript["fiftyTwoWeekLow"],
  TScript["fiftyTwoWeekHigh"]
];

export type TMasterDataDerivatives = [
  TScript["exchangeSymbol"],
  TScript["underlying"],
  TScript["assetClass"],
  TMasterDataDerivativesScript[]
];

export type TMasterData = {
  [MASTER_DATA_SEGMENTS.NSE_EQ_EQUITY]?: TMasterDataEquity[];
  [MASTER_DATA_SEGMENTS.BSE_EQ_EQUITY]?: TMasterDataEquity[];
  [MASTER_DATA_SEGMENTS.NSE_FO_FUTSTK]?: TMasterDataDerivatives[];
  [MASTER_DATA_SEGMENTS.NSE_FO_FUTIDX]?: TMasterDataDerivatives[];
  [MASTER_DATA_SEGMENTS.NSE_FO_OPTIDX]?: TMasterDataDerivatives[];
  [MASTER_DATA_SEGMENTS.NSE_FO_OPTSTK]?: TMasterDataDerivatives[];
  [MASTER_DATA_SEGMENTS.NSE_CURR_FUTCUR]?: TMasterDataDerivatives[];
  [MASTER_DATA_SEGMENTS.NSE_CURR_OPTCUR]?: TMasterDataDerivatives[];
  [MASTER_DATA_SEGMENTS.MCX_COMM_OPTFUT]?: TMasterDataDerivatives[];
  [MASTER_DATA_SEGMENTS.MCX_COMM_FUTCOM]?: TMasterDataDerivatives[];
  [MASTER_DATA_SEGMENTS.NCDEX_COMM_OPTFUT]?: TMasterDataDerivatives[];
  [MASTER_DATA_SEGMENTS.NCDEX_COMM_FUTCOM]?: TMasterDataDerivatives[];
  [MASTER_DATA_SEGMENTS.NSE_CURR_UNDERLYING]?: TMasterDataUnderlying[];
  [MASTER_DATA_SEGMENTS.MCX_COMM_UNDERLYING]?: TMasterDataUnderlying[];
  [MASTER_DATA_SEGMENTS.NCDEX_COMM_UNDERLYING]?: TMasterDataUnderlying[];
  [MASTER_DATA_SEGMENTS.NSE_EQ_UNDERLYING]?: TMasterDataUnderlying[];
  [MASTER_DATA_SEGMENTS.BSE_EQ_UNDERLYING]?: TMasterDataUnderlying[];
};

export type TScriptIdIndexValue =
  | [MASTER_DATA_SEGMENTS, number]
  | [MASTER_DATA_SEGMENTS, number, number, number];

export type TScriptIdIndex = {
  [key: TScriptId]: TScriptIdIndexValue;
};

export type TDerivativesIndex = {
  [key: TScriptId]: {
    FUTURES: TScriptId[];
    OPTIONS: TScriptId[];
  };
};

export type TSearchChunkId = number;

export type TSearchStringIndex = {
  [key: TSearchChunkId]: {
    searchString: TScript["searchable"];
    data: TScriptIdIndexValue;
    searchPriority: TScript["searchPriority"];
    exchangeSymbol: TScript["exchangeSymbol"];
  }[];
};

type TIsinCode = string; // TScript['isinCode'] // TODO: Figure out typescript to remove undefined or null
export type TIsinCodeIndex = {
  [key: TIsinCode]: TScriptId[];
};

export type TStore = {
  [STORE_KEYS.MASTER_DATA]?: TMasterData;
  [STORE_KEYS.SCRIPT_ID_INDEX]?: TScriptIdIndex;
  [STORE_KEYS.DERIVATIVES_INDEX]?: TDerivativesIndex;
  [STORE_KEYS.SEARCH_STRING_INDEX]?: TSearchStringIndex;
  [STORE_KEYS.ISIN_CODE_INDEX]?: TIsinCodeIndex;
};
