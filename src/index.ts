import { initializeDownload } from './Download/index'
import { IConfig } from './TYPES/Config'
export {
  getScripByScripId,
  getDerivativeScripsByScripId,
  getScripsByIsinCode,
  getScripsByScripIds
} from './secMaster'

/** ${1:Description placeholder} */
const DEFAULT_VALUES: IConfig = {
  requireSearchModule: false,
  requireSocketModule: false
}

/**
 * ${1:Description placeholder}
 *
 * @param secMasterURL
 * @param [config=DEFAULT_VALUES]
 */
export function initialize(
  secMasterURL: string,
  config: IConfig = DEFAULT_VALUES
) {
  const { requireSearchModule = false, requireSocketModule = false } = config

  // NOTE: initializing security master download and preparing indexes
  initializeDownload(secMasterURL, config)

  // TODO: initiate the search worker setup here
  // if (requireSearchModule) {
  //   initializeSearchWorker(config);
  // }
  // TODO: initiate the socket worker setup here
  if (requireSocketModule) {
    // initializeSocket()
  }
}
