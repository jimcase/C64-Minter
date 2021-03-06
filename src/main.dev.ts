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

/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import storage from 'electron-json-storage';
import MenuBuilder from './menu';

const {
  HANDLE_FETCH_DATA,
  FETCH_DATA_FROM_STORAGE,
  SAVE_DATA_IN_STORAGE,
  HANDLE_SAVE_WALLET,
  REMOVE_DATA_FROM_STORAGE,
  HANDLE_REMOVE_DATA,
  HANDLE_SAVE_DATA,
  HANDLE_REMOVE_WALLET,
  SAVE_WALLET_IN_STORAGE,
  FETCH_WALLETS_FROM_STORAGE,
  REMOVE_WALLET_FROM_STORAGE,
  HANDLE_FETCH_WALLETS,
} = require('./utils/constants/storageConstants');

// A reference to the itemsToTrack array, full of JS/JSON objects. All mutations to the array are performed in the main.js app, but each mutation will trigger a rewrite to the user's storage for data persistence
let itemsToTrack = [];
/* eslint prefer-const: "error" */
let wallets = [];

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1200,
    height: 900,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// Receive a SAVE_DATA_IN_STORAGE call from renderer
ipcMain.on(SAVE_DATA_IN_STORAGE, (_event, message) => {
  console.log('Main received: SAVE_DATA_IN_STORAGE');
  // update the itemsToTrack array.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  itemsToTrack.push(message);

  // Save itemsToTrack to storage
  storage.set('itemsToTrack', itemsToTrack, (error) => {
    if (error) {
      console.log('We errored! What was data?');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mainWindow.send(HANDLE_SAVE_DATA, {
        success: false,
        message: 'itemsToTrack not saved',
      });
    } else {
      // Send message back to window as 2nd arg "data"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mainWindow.send(HANDLE_SAVE_DATA, {
        success: true,
        message,
      });
    }
  });
});

ipcMain.on(FETCH_DATA_FROM_STORAGE, (_event, message) => {
  console.log('Main received: FETCH_DATA_FROM_STORAGE with message:', message);
  // Get the user's itemsToTrack from storage
  // For our purposes, message = itemsToTrack array
  storage.get(message, (error, data) => {
    // if the itemsToTrack key does not yet exist in storage, data returns an empty object, so we will declare itemsToTrack to be an empty array
    // eslint-disable-next-line @typescript-eslint/no-shadow
    itemsToTrack = JSON.stringify(data) === '{}' ? [] : data;
    if (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mainWindow.send(HANDLE_FETCH_DATA, {
        success: false,
        message: 'itemsToTrack not returned',
      });
    } else {
      // Send message back to window
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mainWindow.send(HANDLE_FETCH_DATA, {
        success: true,
        message: itemsToTrack, // do something with the data
      });
    }
  });
});

// Receive a REMOVE_DATA_FROM_STORAGE call from renderer
ipcMain.on(REMOVE_DATA_FROM_STORAGE, (_event, message) => {
  console.log('Main Received: REMOVE_DATA_FROM_STORAGE');
  // Update the items to Track array.
  itemsToTrack = itemsToTrack.filter((item) => item !== message);
  // Save itemsToTrack to storage
  storage.set('itemsToTrack', itemsToTrack, (error) => {
    if (error) {
      console.log('We errored! What was data?');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mainWindow.send(HANDLE_REMOVE_DATA, {
        success: false,
        message: 'itemsToTrack not saved',
      });
    } else {
      // Send new updated array to window as 2nd arg "data"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mainWindow.send(HANDLE_REMOVE_DATA, {
        success: true,
        message: itemsToTrack,
      });
    }
  });
});

/*
  Wallet Handler
 */

// Receive a SAVE_WALLET_IN_STORAGE call from renderer
ipcMain.on(SAVE_WALLET_IN_STORAGE, (_event, message) => {
  // update the wallets array.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  wallets.push(message);

  // Save wallets to storage
  storage.set('wallets', wallets, (error) => {
    if (error) {
      console.log('We errored! What was data?');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mainWindow.send(HANDLE_SAVE_WALLET, {
        success: false,
        message: 'wallets not saved',
      });
    } else {
      // Send message back to window as 2nd arg "data"
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mainWindow.send(HANDLE_SAVE_WALLET, {
          success: true,
          message,
        });
      } catch (e) {
        console.log(e);
      }
    }
  });
});

ipcMain.on(FETCH_WALLETS_FROM_STORAGE, (_event) => {
  // Get the user's itemsToTrack from storage
  // For our purposes, message = itemsToTrack array
  storage.get('wallets', (error, data) => {
    wallets = JSON.stringify(data) === '{}' ? [] : data;
    if (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mainWindow.send(HANDLE_FETCH_WALLETS, {
        success: false,
        message: 'wallets not returned',
      });
    } else {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mainWindow.send(HANDLE_FETCH_WALLETS, {
          success: true,
          message: wallets, // do something with the data
        });
      } catch (e) {
        console.log(e);
      }
    }
  });
});

// Receive a REMOVE_WALLET_FROM_STORAGE call from renderer
ipcMain.on(REMOVE_WALLET_FROM_STORAGE, (_event, message) => {
  // Update the items to Track array.
  wallets = wallets.filter((item) => item !== message);
  // Save wallets to storage
  storage.set('wallets', wallets, (error) => {
    if (error) {
      console.log('We errored! What was data?');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mainWindow.send(HANDLE_REMOVE_WALLET, {
        success: false,
        message: 'wallets not saved',
      });
    } else {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mainWindow.send(HANDLE_REMOVE_WALLET, {
          success: true,
          message: wallets,
        });
      } catch (e) {
        console.log(e);
      }
    }
  });
});
