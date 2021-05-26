/*
  Copyright (c) 2021, C64 <c64@gmail.com>. All rights reserved.

  Licensed to the Apache Software Foundation (ASF) under one
  or more contributor license agreements.  See the NOTICE file
  distributed with this work for additional information
  regarding copyright ownership.  The ASF licenses this file
  to you under the Apache License, Version 2.0 (the
  "License"); you may not use this file except in compliance
  with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing,
  software distributed under the License is distributed on an
  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, either express or implied.  See the License for the
  specific language governing permissions and limitations
  under the License.
*/

const { ipcRenderer } = require('electron');
const {
  FETCH_DATA_FROM_STORAGE,
  SAVE_DATA_IN_STORAGE,
  REMOVE_DATA_FROM_STORAGE,
  SAVE_WALLET_IN_STORAGE,
  REMOVE_WALLET_FROM_STORAGE,
  FETCH_WALLET_FROM_STORAGE_BY_KEY,
  FETCH_WALLETS_FROM_STORAGE,
} = require('./utils/storageConstants');

// Ask main to load data from its persistent storage
export function loadSavedData() {
  console.log('Renderer sending: FETCH_DATA_FROM_STORAGE');
  ipcRenderer.send(FETCH_DATA_FROM_STORAGE, 'itemsToTrack');
}
// Ask main to load data from its persistent storage
export function loadSavedData2() {
  ipcRenderer.send(FETCH_WALLETS_FROM_STORAGE);
}

// Send item message to main
export function saveDataInStorage(item) {
  ipcRenderer.send(SAVE_DATA_IN_STORAGE, item);
}

// Remove an item
// eslint-disable-next-line import/prefer-default-export
export function removeDataFromStorage2(item) {
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
