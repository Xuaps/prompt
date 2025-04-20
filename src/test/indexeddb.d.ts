interface IDBEvent {
  type: string
  target: any
  currentTarget: any
  bubbles: boolean
  cancelable: boolean
  defaultPrevented: boolean
  composed: boolean
  timeStamp: number
  srcElement: null
  returnValue: boolean
  cancelBubble: boolean
  path: any[]
  preventDefault(): void
  stopPropagation(): void
  stopImmediatePropagation(): void
  composedPath(): any[]
}

type IDBEventHandler = ((event: IDBEvent) => void) | null

interface IDBObjectStore {
  get(key: any): { onsuccess: IDBEventHandler; onerror: IDBEventHandler; result: any }
  put(value: any): { onsuccess: IDBEventHandler; onerror: IDBEventHandler; result: any }
  delete(key: any): { onsuccess: IDBEventHandler; onerror: IDBEventHandler }
  getAll(): { onsuccess: IDBEventHandler; onerror: IDBEventHandler; result: any[] }
  index(name: string): { getAll(): { onsuccess: IDBEventHandler; onerror: IDBEventHandler; result: any[] } }
}

interface IDBTransaction {
  objectStore(name: string): IDBObjectStore
  commit(): void
  oncomplete: IDBEventHandler
  onerror: IDBEventHandler
}

interface IDBDatabase {
  transaction(storeNames: string | string[], mode?: IDBTransactionMode): IDBTransaction
  createObjectStore(name: string): IDBObjectStore
  deleteObjectStore(name: string): void
  objectStoreNames: { contains(name: string): boolean }
  close(): void
}

interface IDBOpenDBRequest {
  result: IDBDatabase
  onsuccess: IDBEventHandler
  onerror: IDBEventHandler
  onupgradeneeded: IDBEventHandler
  readyState: string
  transaction: IDBTransaction
}

interface IDBFactory {
  open(name: string, version?: number): IDBOpenDBRequest
  deleteDatabase(name: string): { onsuccess: IDBEventHandler; onerror: IDBEventHandler }
}

declare global {
  var indexedDB: IDBFactory
} 