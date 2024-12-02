/**
 * Defines the structure of constants used to interact with a web worker.
 * Each property represents a specific action or lifecycle event for the worker.
 */
export interface IWorkerConstantsOptions {
  init: string
  start: string
  search: string
  terminate: string
}
