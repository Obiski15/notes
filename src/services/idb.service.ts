"use client"

import { IDBPDatabase, openDB } from "idb"

export abstract class IdbService {
  protected dbName: string
  protected storeName: string
  protected version: number
  protected db: Promise<IDBPDatabase<unknown>>

  constructor(dbName: string, storeName: string) {
    this.dbName = dbName
    this.storeName = storeName
    this.version = 1
    this.db = this.idbInit(this.storeName, this.version)()
  }

  private idbInit = (storeName: string, version: number) => {
    return async () =>
      openDB(this.dbName, version, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(storeName, {
              // The 'id' property of the object will be the key.
              keyPath: "id",

              // If it isn't explicitly set, create a value by auto incrementing.
              autoIncrement: true,
            })

            store.createIndex("id", "id", { unique: true })
          }
        },
      })
  }
}
