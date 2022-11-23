export enum STORAGE_NAMES {
  ACTIVE_FORM_SECTION = 'CUSTOMER_MANAGEMENT-activeFormSection',
}

// type StorageType = 'localStorage' | 'sessionStorage'
// export type StorageNameType = 'activeFormSection'
// export type StorageAction = 'getItem' | 'setItem' | 'removeItem' | 'clear'

// export function browserStorage(storageType: StorageType, action: StorageAction, storageName: StorageNameType, itemToStore?: any) {
//   if (!itemToStore && action === 'setItem') {
//     const name = storageName ? storageName : 'browser storage'
//     throw Error(`You cannot set an empty item to ${name}`)
//   }

//   if (itemToStore && action !== 'setItem') {
//     throw Error(`You cannot perform this operation`)
//   }

//   if (action === 'setItem') {
//     const storage = storageType === "localStorage" ? "localStorage" : "sessionStorage"
//     const theAction = action === "setItem" ? ""
//     return [storageType][action](`${storageName}`, JSON.stringify(itemToStore))
//   }

//   if (action === 'removeItem') {
//     return [storageType][action](`${storageName}`)
//   }

//   if (action === 'getItem') {
//     return [storageType][action](`${storageName}`)
//   }

//   if (action === 'clear') {
//     return [storageType][action]()
//   }
// }
