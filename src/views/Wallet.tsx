import React, { useEffect, useState } from 'react';
import WalletInfo from '../WalletInfo';
import WalletItem from '../components/wallet/WalletItem';
import HandleWallet from '../components/HandleWallet';
import { loadSavedData2 } from '../renderer';

const { ipcRenderer } = require('electron');
const { HANDLE_FETCH_WALLETS } = require('../utils/constants');

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WalletProps {
  walletList?: { name: string; masterKey: string }[];
}

// eslint-disable-next-line react/prop-types
const Wallet: React.FC<WalletProps> = (walletList) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [wallets, setWallets] = useState([]); // localStorage

  const handleReceiveData = (_event, data) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setWallets(data.message);
  };

  // Grab the user's saved itemsToTrack after the app loads
  useEffect(() => {
    loadSavedData2();
  }, []);

  useEffect(() => {
    ipcRenderer.on(HANDLE_FETCH_WALLETS, handleReceiveData);
    return () => {
      ipcRenderer.removeListener(HANDLE_FETCH_WALLETS, handleReceiveData);
    };
  });

  return (
    <div>
      <div className="scrollmenu">
        <div id="addWalletButton">
          <HandleWallet />
        </div>
        {wallets.map((wallet) => (
          <WalletItem
            key={JSON.parse(wallet).name}
            walletName={JSON.parse(wallet).name}
            selected={false}
          >
            {wallet}{' '}
          </WalletItem>
        ))}
      </div>
      <WalletInfo />
    </div>
  );
};

export default Wallet;
