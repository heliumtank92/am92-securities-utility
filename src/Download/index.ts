import { IConfig } from '../TYPES/Config'
import DownloadManager from './DownloadManager'

/** ${1:Description placeholder} */
const DEFAULT_VALUES = { requireSearchModule: false }

// initialize
/**
 * ${1:Description placeholder}
 *
 * @param secMasterURL
 * @param [config=DEFAULT_VALUES]
 */
export function initializeDownload(
  secMasterURL: string,
  config: IConfig = DEFAULT_VALUES
) {
  new DownloadManager(secMasterURL, config)
}
