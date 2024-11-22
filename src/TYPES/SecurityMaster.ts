/** ${1:Description placeholder} */
export type TSecSegmentTypes =
  | 'NSE_EQ_EQUITY'
  | 'BSE_EQ_EQUITY'
  | 'NSE_FO_FUTSTK'
  | 'NSE_FO_FUTIDX'
  | 'NSE_FO_OPTIDX'
  | 'NSE_FO_OPTSTK'
  | 'NSE_CURR_FUTCUR'
  | 'NSE_CURR_OPTCUR'
  | 'MCX_COMM_OPTFUT'
  | 'MCX_COMM_FUTCOM'
  | 'NCDEX_COMM_OPTFUT'
  | 'NCDEX_COMM_FUTCOM'
  | 'NSE_CURR_UNDERLYING'
  | 'MCX_COMM_UNDERLYING'
  | 'NCDEX_COMM_UNDERLYING'
  | 'NSE_EQ_UNDERLYING'
  | 'BSE_EQ_UNDERLYING'

/** ${1:Description placeholder} */
type TSecSegmentStructureType = 'FLAT_EQUITY' | 'FLAT_UNDERLYING' | 'NESTED'

/** ${1:Description placeholder} */
export type TSecSegmentStructureMapType = {
  name: TSecSegmentTypes
  type: TSecSegmentStructureType
}
