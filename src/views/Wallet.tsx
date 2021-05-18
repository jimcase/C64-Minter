import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import WalletItem from '../components/wallet/WalletItem';
import HandleWallet from '../components/HandleWallet';
import { loadSavedData2 } from '../renderer';
import WalletPanel from '../components/wallet/WalletPanel';

const { ipcRenderer } = require('electron');
const { HANDLE_FETCH_WALLETS } = require('../utils/constants');

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WalletProps {}

// eslint-disable-next-line react/prop-types
const Wallet: React.FC<WalletProps> = () => {
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
    <div id="walletView" style={{ height: '100%' }}>
      <Container>
        <div className="scrollmenu">
          <div id="addWalletButton">
            <HandleWallet
              onAddWallet={() => {
                loadSavedData2();
              }}
            />
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
        <WalletPanel />
      </Container>
    </div>
  );
};

export default Wallet;
