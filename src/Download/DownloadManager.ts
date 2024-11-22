import { addStore } from '../store'
import { IConfig } from '../TYPES/Config'

// TODO: move this to another file
/** ${1:Description placeholder} */
type TMessageEvent = {
  action: string
  data?: any
}

/**
 * ${1:Description placeholder}
 *
 * @class
 */
export default class DownloadManager {
  /** ${1:Description placeholder} */
  worker: any
  /**
   * Creates an instance of DownloadManager.
   *
   * @constructor
   * @param secMasterURL
   * @param config
   */
  constructor(secMasterURL: string, config: IConfig) {
    this.worker = new Worker(new URL('./DownloadWorker.js', import.meta.url), {
      type: 'module'
    })

    this.worker.postMessage({ action: 'INIT', data: { config, secMasterURL } })
    this.worker.onmessage = this.onMessage
    this.worker.onerror = this.onError
  }

  /**
   * ${1:Description placeholder}
   *
   * @param event
   */
  onMessage = (event: MessageEvent<TMessageEvent>) => {
    const { action } = event.data
    if (action === 'INDEXES_CREATED') {
      const masterDataWithIndexes = event.data?.data
      // REVIEW: add to store - remove this console
      console.log(event.data, '>>>>>>>>>')
      addStore(masterDataWithIndexes)
    }
  }

  /** ${1:Description placeholder} */
  onError = () => {
    console.log('error')
  }
}
