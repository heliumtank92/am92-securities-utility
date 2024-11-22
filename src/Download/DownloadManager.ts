import { addStore } from "../store";
import { IConfig } from "../TYPES/Config";

// TODO: move this to another file
type TMessageEvent = {
  action: string;
  data?: any;
};

export default class DownloadManager {
  worker: any;
  constructor(secMasterURL: string, config: IConfig) {
    this.worker = new Worker(new URL("./DownloadWorker.js", import.meta.url), {
      type: "module",
    });

    this.worker.postMessage({ action: "INIT", data: { config, secMasterURL } });
    this.worker.onmessage = this.onMessage;
    this.worker.onerror = this.onError;
  }

  onMessage = (event: MessageEvent<TMessageEvent>) => {
    const { action } = event.data;
    if (action === "INDEXES_CREATED") {
      const masterDataWithIndexes = event.data?.data;
      // REVIEW: add to store - remove this console
      console.log(event.data, ">>>>>>>>>");
      addStore(masterDataWithIndexes);
    }
  };

  onError = () => {
    console.log("error");
  };
}
