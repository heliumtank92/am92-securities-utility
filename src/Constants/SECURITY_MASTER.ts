import { TSecSegmentStructureMapType } from '../TYPES/SecurityMaster'

/** ${1:Description placeholder} */
export const SEC_SEGMENTS: TSecSegmentStructureMapType[] = [
  { name: 'NSE_EQ_EQUITY', type: 'FLAT_EQUITY' },
  { name: 'BSE_EQ_EQUITY', type: 'FLAT_EQUITY' },
  { name: 'NSE_FO_FUTSTK', type: 'NESTED' },
  { name: 'NSE_FO_FUTIDX', type: 'NESTED' },
  { name: 'NSE_FO_OPTIDX', type: 'NESTED' },
  { name: 'NSE_FO_OPTSTK', type: 'NESTED' },
  { name: 'NSE_CURR_FUTCUR', type: 'NESTED' },
  { name: 'NSE_CURR_OPTCUR', type: 'NESTED' },
  { name: 'MCX_COMM_OPTFUT', type: 'NESTED' },
  { name: 'MCX_COMM_FUTCOM', type: 'NESTED' },
  { name: 'NCDEX_COMM_OPTFUT', type: 'NESTED' },
  { name: 'NCDEX_COMM_FUTCOM', type: 'NESTED' },
  { name: 'NSE_CURR_UNDERLYING', type: 'FLAT_UNDERLYING' },
  { name: 'MCX_COMM_UNDERLYING', type: 'FLAT_UNDERLYING' },
  { name: 'NCDEX_COMM_UNDERLYING', type: 'FLAT_UNDERLYING' },
  { name: 'NSE_EQ_UNDERLYING', type: 'FLAT_UNDERLYING' },
  { name: 'BSE_EQ_UNDERLYING', type: 'FLAT_UNDERLYING' }
]
