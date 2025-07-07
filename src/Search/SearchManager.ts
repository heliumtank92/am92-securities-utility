// import secMaster from '~/src/Lib/SecMaster'
// import { WORKER_CONSTANTS_OPTIONS } from '../Constants/SEARCH_WORKER'
import { SECURITY_MASTER_NOT_INITIALIZED } from '../Constants/ERROR_MESSAGE'
import {
  // GLOBAL_SUCCESS_EVENT_NAME,
  SECURITY_MASTER_INITIALIZED
} from '../Constants/EVENTS'
import { WORKER_CONSTANTS_OPTIONS } from '../Constants/SEARCH_WORKER'
import { getScriptByScriptIdIndexValue } from '../secMaster'
import { getSearchIndex, getSecurityMasterInitializationStatus } from '../store'
// import AppStore from '~/src/Configurations/AppStore'
// import { search } from '~/src/Redux/Search/Reducer'

class SearchManager {
  STATE: 'INIT' | 'READY' = 'INIT'
  WORKER: Worker[] = []
  constructor() {
    const IS_SECURITY_MASTER_LOADED = getSecurityMasterInitializationStatus()
    // const { __SEC_MASTER_LOADING__ } = (window as any) || {}
    // if (__SEC_MASTER_LOADING__ === 'DONE') {
    if (IS_SECURITY_MASTER_LOADED) {
      this.initialize()
    } else {
      addEventListener(SECURITY_MASTER_INITIALIZED, this.initialize)
    }
  }

  initialize = () => {
    this.STATE = 'READY'

    // get Chunks from secmaster
    const chunks = getSearchIndex()

    if (chunks) {
      // loop on chunks and add workers to WORKER
      Object.values(chunks).forEach((chunk, index) => {
        const searchWorker = new Worker(
          new URL('./SearchWorker.js', import.meta.url),
          {
            type: 'module'
          }
        )
        this.WORKER.push(searchWorker)
        // postmessage on workers to pass chunk data and index with initialize event
        searchWorker.postMessage({
          payload: chunk,
          index,
          actionType: WORKER_CONSTANTS_OPTIONS.init
        })
      })
    }
  }

  search = async (searchString: string) => {
    return new Promise(resolve => {
      if (!getSecurityMasterInitializationStatus()) {
        console.warn(SECURITY_MASTER_NOT_INITIALIZED)
        resolve([])
      }

      const workerResults: any[] = []
      let resultCount = 0
      // loop on workers and post message search event with search string
      this.WORKER.forEach(workerInstance => {
        workerInstance.postMessage({
          actionType: 'SEARCH',
          searchString
        })

        workerInstance.onmessage = (event: MessageEvent) => {
          const { data } = event
          ++resultCount
          const { workerIndex, searchResult } = data
          workerResults[workerIndex] = searchResult
          if (resultCount === this.WORKER.length) {
            const searchResult = this._flattenResult(workerResults)
            // AppStore.dispatch(search(searchResult))
            console.log(searchResult, 'searchResult')
            resolve(searchResult)
          }
        }
      })
    })
  }

  _flattenResult = (workerResults: any[]) => {
    const searchResult: any[] = []

    workerResults.forEach(workerResult => {
      workerResult.forEach((resultItem: any) => {
        const script = getScriptByScriptIdIndexValue(resultItem.obj.data)
        searchResult.push({ ...script })
      })
    })
    return searchResult
  }
}

const searchManager = new SearchManager()
export { searchManager }
