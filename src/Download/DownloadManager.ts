import { SECURITY_MASTER_INITIALIZED } from '../Constants/EVENTS'
import { addStore, setSecurityMasterInitializationStatus } from '../store'
import { IConfig } from '../TYPES/Config'

// TODO: move this to another file
/** Type representing the structure of messages received from the worker. */
type TMessageEvent = {
  action: string
  data?: any
}

/**
 * Class responsible for managing the download and processing of security master data.
 *
 * This class uses a web worker to handle downloading and processing data in the background.
 * It sends messages to the worker to initialize the process, and handles messages back from the worker
 * to update the application's store and trigger necessary events when the download is complete.
 *
 * @class DownloadManager
 */
export default class DownloadManager {
  worker: any
  /**
   * Creates an instance of DownloadManager.
   *
   * Initializes a new web worker and starts the process of downloading security master data.
   * The worker is passed the URL for the security master data and the configuration data needed for the download process.
   *
   * @constructor
   * @param secMasterURL The URL to fetch the security master data from.
   * @param config The configuration object for the worker's behavior.
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
   * Handles messages received from the worker.
   *
   * Processes the 'INDEXES_CREATED' action, which indicates that the worker has finished processing the data.
   * The master data with indexes is added to the store, and the security master initialization status is updated.
   * An event is dispatched to notify the system that the security master initialization is complete.
   *
   * @param event The event object containing the message data from the worker.
   */
  onMessage = (event: MessageEvent<TMessageEvent>) => {
    const { action } = event.data
    if (action === 'INDEXES_CREATED') {
      const masterDataWithIndexes = event.data?.data
      // TODO: kept this for initial debug - remove it later
      console.log(event.data, '>>>>>>>>>')
      addStore(masterDataWithIndexes)
      setSecurityMasterInitializationStatus()
      dispatchEvent(new Event(SECURITY_MASTER_INITIALIZED))
    }
  }

  /** Handles any errors that occur during the execution of the worker. */
  onError = () => {
    console.group('Error in worker')
    console.log('error')
    console.groupEnd()
  }
}
