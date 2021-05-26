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

import React, { useEffect, useState } from 'react';
import WalletItem from '../components/Wallet/WalletItem';
import HandleWallet from '../components/Wallet/HandleWallet';
import { loadSavedData2 } from '../renderer';
import WalletPanel from '../components/Wallet/Panel/WalletPanel';

const { ipcRenderer } = require('electron');
const { HANDLE_FETCH_WALLETS } = require('../utils/storageConstants');

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WalletProps {}

// eslint-disable-next-line react/prop-types
const Wallet: React.FC<WalletProps> = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [wallets, setWallets] = useState([
    {
      name: '',
      encryptedMasterKey: '',
      publicKeyHex: '',
      internalPubAddress: {},
      externalPubAddress: {},
    },
  ]); // localStorage
  const [selectedWallet, setWallet] = useState(
    wallets[0] || {
      name: '',
      encryptedMasterKey: '',
      publicKeyHex: '',
      internalPubAddress: {},
      externalPubAddress: {},
    }
  );

  const getWallet = (
    name: string
  ): {
    name: string;
    encryptedMasterKey: string;
    publicKeyHex: string;
    internalPubAddress: {
      [key: string]: string;
    };
    externalPubAddress: {
      [key: string]: string;
    };
  } => {
    console.log(`selected wallet ${name}`);
    for (let i = 0; i < wallets.length; i += 1) {
      if (wallets[i].name === name) {
        return wallets[i];
      }
    }
    return wallets[0];
  };
  const handleReceiveData = (_event, data) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const wts: {
      name: string;
      encryptedMasterKey: string;
      publicKeyHex: string;
      internalPubAddress: string[];
      externalPubAddress: string[];
    }[] = [];
    data.message.forEach(function (wallet: string) {
      wts.push(JSON.parse(wallet));
    });
    setWallets(wts);
  };

  // Grab the user's saved wallets after the app loads, just one time
  useEffect(() => {
    loadSavedData2();
    if (selectedWallet.name === '' && wallets && wallets.length) {
      setWallet(wallets[0]);
    }
  }, [wallets]);

  useEffect(() => {
    ipcRenderer.on(HANDLE_FETCH_WALLETS, handleReceiveData);
    return () => {
      ipcRenderer.removeListener(HANDLE_FETCH_WALLETS, handleReceiveData);
    };
  }, []);

  return (
    <div id="walletView" style={{ height: '100%' }}>
      <div id="walletContent">
        <div className="scrollmenu">
          <div id="addWalletButton">
            <HandleWallet
              onAddWallet={() => {
                loadSavedData2();
              }}
            />
          </div>
          {wallets.map((wallet) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <span
              key={wallet.name}
              onClick={() => setWallet(getWallet(wallet.name))}
            >
              <WalletItem walletName={wallet.name} selected={false} />
            </span>
          ))}
        </div>
        <WalletPanel wallet2={selectedWallet} />
      </div>
    </div>
  );
};

export default Wallet;
