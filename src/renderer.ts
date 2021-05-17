const { ipcRenderer } = require('electron');
const {
  FETCH_DATA_FROM_STORAGE,
  SAVE_DATA_IN_STORAGE,
  REMOVE_DATA_FROM_STORAGE,
  SAVE_WALLET_IN_STORAGE,
  REMOVE_WALLET_FROM_STORAGE,
  FETCH_WALLET_FROM_STORAGE_BY_KEY,
  FETCH_WALLETS_FROM_STORAGE,
} = require('./utils/constants');

// Ask main to load data from its persistent storage
export function loadSavedData() {
  console.log('Renderer sending: FETCH_DATA_FROM_STORAGE');
  ipcRenderer.send(FETCH_DATA_FROM_STORAGE, 'itemsToTrack');
}
// Ask main to load data from its persistent storage
export function loadSavedData2() {
  console.log('Renderer sending: FETCH_WALLETS_FROM_STORAGE');
  ipcRenderer.send(FETCH_WALLETS_FROM_STORAGE);
}

// Send item message to main
export function saveDataInStorage(item) {
  console.log('Renderer sending: SAVE_DATA_IN_STORAGE');
  ipcRenderer.send(SAVE_DATA_IN_STORAGE, item);
}

// Remove an item
// eslint-disable-next-line import/prefer-default-export
export function removeDataFromStorage2(item) {
  console.log('Renderer sending: REMOVE_DATA_FROM_STORAGE');
  ipcRenderer.send(REMOVE_DATA_FROM_STORAGE, item);
}

/*
  Wallets
 */

// Send wasmV4 message to main electron process
export function saveWalletInStorageByKey(wallet: string) {
  console.log('Renderer sending: SAVE_WALLET_IN_STORAGE');
  ipcRenderer.send(SAVE_WALLET_IN_STORAGE, wallet);
}

// remove wasmV4 from storage by key
export function removeWalletFromStorageByKey(key) {
  console.log('Renderer sending: REMOVE_WALLET_FROM_STORAGE');
  ipcRenderer.send(REMOVE_WALLET_FROM_STORAGE, key);
}

// fetch wasmV4 from storage by key
export function fetchWalletFromStorageByKey(key) {
  console.log('Renderer sending: FETCH_WALLETS_FROM_STORAGE');
  ipcRenderer.send(FETCH_WALLET_FROM_STORAGE_BY_KEY, key);
}

// fetch all wallets from storage
export function fetchAllWalletsFromStorage() {
  console.log('Renderer sending: FETCH_ALL_WALLETS_FROM_STORAGE');
  ipcRenderer.send(FETCH_WALLETS_FROM_STORAGE);
}
