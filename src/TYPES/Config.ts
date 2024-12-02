/**
 * Config interface for modules required in the application.
 * This interface allows defining which modules should be included or required.
 */
export interface IConfig {
  requireSearchModule?: boolean
  requireSocketModule?: boolean
}
