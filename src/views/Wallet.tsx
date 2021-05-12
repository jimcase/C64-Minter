import React from 'react';

import WalletInfo from '../WalletInfo';
import WalletItem from '../components/wallet/WalletItem';
import WalletModal from '../components/WalletModal';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WalletProps {}

// eslint-disable-next-line react/prop-types
const Wallet: React.FC<WalletProps> = () => {
  return (
    <div>
      <div className="scrollmenu">
        <div id="addWalletButton">
          <WalletModal />
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
