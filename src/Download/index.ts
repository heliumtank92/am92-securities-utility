import { IConfig } from "../TYPES/Config";
import DownloadManager from "./DownloadManager";

const DEFAULT_VALUES = { requireSearchModule: false };

// initialize
export function initializeDownload(
  secMasterURL: string,
  config: IConfig = DEFAULT_VALUES
) {
  new DownloadManager(secMasterURL, config);
}
