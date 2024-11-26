/**
 * Represents the possible segment types for different securities traded in various exchanges.
 *
 * @type {TSecSegmentTypes}
 * @enum
 */
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

/**
 * Represents the possible structure types of security segments, defining how the data is organized.
 *
 * @type {TSecSegmentStructureType}
 * @enum
 */
type TSecSegmentStructureType = 'FLAT_EQUITY' | 'FLAT_UNDERLYING' | 'NESTED'

/**
 * Interface representing the mapping of a security segment to its structure type.
 * It ties the segment type to the structure used to organize the data.
 *
 * @interface ISecSegmentStructureMapType
 */
export interface ISecSegmentStructureMapType {
  name: TSecSegmentTypes
  type: TSecSegmentStructureType
}
