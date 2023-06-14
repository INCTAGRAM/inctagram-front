let db: IDBDatabase
let request: IDBOpenDBRequest

export const postDraftDBConfig = {
  DBName: 'postDraftDB',
  version: 1,
  storeName: 'postDraft',
  keyPath: 'postId',
}

export const initIndexedDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open(postDraftDBConfig.DBName, postDraftDBConfig.version)
    request.onupgradeneeded = () => {
      db = request.result

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(postDraftDBConfig.storeName)) {
        db.createObjectStore(postDraftDBConfig.storeName, { keyPath: postDraftDBConfig.keyPath })
      }
      // no need to resolve here
    }

    request.onsuccess = () => {
      db = request.result
      postDraftDBConfig.version = db.version
      resolve(true)
    }

    request.onerror = () => {
      resolve(false)
    }
  })
}

export const addIndexedDBData = <T>(storeName: string, data: T): Promise<T | string | null> => {
  return new Promise((resolve) => {
    request = indexedDB.open(postDraftDBConfig.DBName, postDraftDBConfig.version)
    request.onsuccess = () => {
      db = request.result
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)

      const getRequest = store.get(postDraftDBConfig.keyPath)
      getRequest.onsuccess = () => {
        const existingData = getRequest.result
        if (existingData !== undefined) {
          store.put(data)
          resolve(data)
        } else {
          store.add(data)
          resolve(data)
        }
      }

      getRequest.onerror = () => {
        const error = getRequest.error?.message
        if (error) {
          resolve(error)
        } else {
          resolve('Unknown error')
        }
      }
    }

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error)
      } else {
        resolve('Unknown error')
      }
    }
  })
}

export const checkDataInIndexedDB = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    request = indexedDB.open(postDraftDBConfig.DBName, postDraftDBConfig.version)

    request.onerror = () => {
      reject(null)
    }

    request.onsuccess = () => {
      const db = request.result
      const tx = db.transaction(postDraftDBConfig.storeName, 'readonly')
      const objectStore = tx.objectStore(postDraftDBConfig.storeName)
      const getRequest = objectStore.get(postDraftDBConfig.keyPath)

      getRequest.onerror = () => {
        reject(null)
      }

      getRequest.onsuccess = () => {
        resolve(getRequest.result === undefined)
      }
    }
  })
}

export const getIndexedDBData = <T>(storeName: string): Promise<T[]> => {
  return new Promise((resolve) => {
    request = indexedDB.open(postDraftDBConfig.DBName, postDraftDBConfig.version)
    request.onsuccess = () => {
      db = request.result
      const tx = db.transaction(storeName, 'readonly')
      const store = tx.objectStore(storeName)
      const res = store.getAll()

      res.onsuccess = () => {
        resolve(res.result)
      }
    }
  })
}

export const deleteIndexedDBData = (storeName: string, key: string): Promise<boolean> => {
  return new Promise((resolve) => {
    request = indexedDB.open(postDraftDBConfig.DBName, postDraftDBConfig.version)
    request.onsuccess = () => {
      db = request.result
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)
      const res = store.delete(key)

      // add listeners that will resolve the Promise
      res.onsuccess = () => {
        resolve(true)
      }
      res.onerror = () => {
        resolve(false)
      }
    }
  })
}
