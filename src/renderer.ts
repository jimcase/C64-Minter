const { ipcRenderer } = require('electron');
const {
  FETCH_DATA_FROM_STORAGE,
  SAVE_DATA_IN_STORAGE,
  REMOVE_DATA_FROM_STORAGE,
  SAVE_WALLET_IN_STORAGE_BY_KEY,
  REMOVE_WALLET_FROM_STORAGE_BY_KEY,
  FETCH_WALLET_FROM_STORAGE_BY_KEY,
  FETCH_ALL_WALLETS_FROM_STORAGE,
} = require('./utils/constants');

// Ask main to load data from its persistent storage
export function loadSavedData() {
  console.log('Renderer sending: FETCH_DATA_FROM_STORAGE');
  ipcRenderer.send(FETCH_DATA_FROM_STORAGE, 'itemsToTrack');
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

// Send wallet message to main electron process
export function saveWalletInStorageByKey(key, wallet) {
  console.log('Renderer sending: SAVE_WALLET_IN_STORAGE_BY_KEY');
  ipcRenderer.send(SAVE_WALLET_IN_STORAGE_BY_KEY, key, wallet);
}

// remove wallet from storage by key
export function removeWalletFromStorageByKey(key) {
  console.log('Renderer sending: REMOVE_WALLET_FROM_STORAGE_BY_KEY');
  ipcRenderer.send(REMOVE_WALLET_FROM_STORAGE_BY_KEY, key);
}

// fetch wallet from storage by key
export function fetchWalletFromStorageByKey(key) {
  console.log('Renderer sending: FETCH_WALLET_FROM_STORAGE_BY_KEY');
  ipcRenderer.send(FETCH_WALLET_FROM_STORAGE_BY_KEY, key);
}

// fetch all wallets from storage
export function fetchAllWalletsFromStorage() {
  console.log('Renderer sending: FETCH_ALL_WALLETS_FROM_STORAGE');
  ipcRenderer.send(FETCH_ALL_WALLETS_FROM_STORAGE);
}
