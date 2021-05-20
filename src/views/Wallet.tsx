import React, { useEffect, useState } from 'react';
import WalletItem from '../components/Wallet/WalletItem';
import HandleWallet from '../components/Wallet/HandleWallet';
import { loadSavedData2 } from '../renderer';
import WalletPanel from '../components/Wallet/Panel/WalletPanel';

const { ipcRenderer } = require('electron');
const { HANDLE_FETCH_WALLETS } = require('../utils/constants');

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
      publicKey: '',
      pubAddress: '',
    },
  ]); // localStorage
  const [selectedWallet, setWallet] = useState(
    wallets[0] || {
      name: '',
      encryptedMasterKey: '',
      publicKey: '',
      pubAddress: '',
    }
  );

  const getWallet = (
    name: string
  ): {
    name: string;
    encryptedMasterKey: string;
    publicKey: string;
    pubAddress: string;
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
      publicKey: string;
      pubAddress: string;
    }[] = [];
    data.message.forEach(function (wallet: string) {
      wts.push(JSON.parse(wallet));
    });
    setWallets(wts);
  };

  // Grab the user's saved itemsToTrack after the app loads
  useEffect(() => {
    loadSavedData2();
    if (selectedWallet.name === '' && wallets && wallets.length) {
      setWallet(wallets[0]);
    }
  }, []);

  useEffect(() => {
    ipcRenderer.on(HANDLE_FETCH_WALLETS, handleReceiveData);
    return () => {
      ipcRenderer.removeListener(HANDLE_FETCH_WALLETS, handleReceiveData);
    };
  });

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
        <WalletPanel wallet={selectedWallet} />
      </div>
    </div>
  );
};

export default Wallet;
