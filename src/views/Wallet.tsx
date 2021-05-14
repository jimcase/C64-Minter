import React, { useEffect, useState } from 'react';

import WalletInfo from '../WalletInfo';
import WalletItem from '../components/wallet/WalletItem';
import HandleWallet from '../components/HandleWallet';

const { ipcRenderer } = require('electron');
const { HANDLE_FETCH_ALL_WALLETS } = require('../utils/constants');

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WalletProps {}

// eslint-disable-next-line react/prop-types
const Wallet: React.FC<WalletProps> = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [wallets, setWallets] = useState([]); // localStorage

  // Receives itemsToTrack from main and sets the state
  const handleReceiveData = (_event, data) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setWallets([...data.message]);
  };

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
          <HandleWallet tags={[{ text: '', textId: '' }]} />
        </div>
        <WalletItem amount={0} name="myWallet1" selected />
        <WalletItem amount={0} name="myWallet2" selected={false} />
        <WalletItem amount={0} name="myWallet3" selected={false} />
        <WalletItem amount={0} name="myWallet4" selected={false} />
        <WalletItem amount={0} name="myWallet5" selected={false} />
      </div>
      <WalletInfo />
    </div>
  );
};

export default Wallet;
