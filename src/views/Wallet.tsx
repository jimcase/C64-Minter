import React, { useEffect, useState } from 'react';

import WalletInfo from '../WalletInfo';
import WalletItem from '../components/wallet/WalletItem';
import HandleWallet from '../components/HandleWallet';
import { loadSavedData2 } from '../renderer';

const { ipcRenderer } = require('electron');
const { HANDLE_FETCH_ALL_WALLETS } = require('../utils/constants');

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WalletProps {
  walletList: { [key: string]: string }[];
}

// eslint-disable-next-line react/prop-types
const Wallet: React.FC<WalletProps> = (walletList) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [wallets, setWallets] = useState(walletList || []); // localStorage

  const handleReceiveData = (_event, data) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log('wallets');
    console.log(data);
    setWallets(data.message);
  };

  // Grab the user's saved itemsToTrack after the app loads
  useEffect(() => {
    loadSavedData2();
  }, []);

  useEffect(() => {
    ipcRenderer.on(HANDLE_FETCH_ALL_WALLETS, handleReceiveData);
    return () => {
      ipcRenderer.removeListener(HANDLE_FETCH_ALL_WALLETS, handleReceiveData);
    };
  });

  return (
    <div>
      <div className="scrollmenu">
        <div id="addWalletButton">
          <HandleWallet />
        </div>
        <WalletItem amount={0} name="myWallet1" selected />
        <WalletItem amount={0} name="myWallet2" selected={false} />
        <WalletItem amount={0} name="myWallet3" selected={false} />
        <WalletItem amount={0} name="myWallet4" selected={false} />
        <WalletItem amount={0} name="myWallet5" selected={false} />
        {Object.keys(wallets).map(function (key) {
          return <div key={key}> {wallets[key]} </div>;
        })}
      </div>
      <WalletInfo />
      <h5>Wallets:</h5>
    </div>
  );
};

export default Wallet;
