import React, { useContext, useState } from 'react';
import { ThemeProvider } from 'react-polymorph/lib/components/ThemeProvider';
import { SimpleSkins } from 'react-polymorph/lib/skins/simple';
import { SimpleDefaults } from 'react-polymorph/lib/themes/simple';
import { LayoutContext } from '../Root/Root';
import Minter from '../../views/Minter';
import Wallet from '../../views/Wallet';

interface WalletState {
  selectedWallet: string;
  name: string;
  publicAddress: string;
  amount: number;

  selectWallet: (wallet: string) => void;
  setName: (name: string) => void;
  setPublicAddress: (address: string) => void;
  setAmount: (amount: number) => void;
}

export const WalletContext = React.createContext<WalletState>({
  selectedWallet: '',
  name: '',
  publicAddress: '',
  amount: 0,
  selectWallet: () => {},
  setName: () => {},
  setPublicAddress: () => {},
  setAmount: () => {},
});

const Content: React.FC = () => {
  const ctx = useContext(LayoutContext);

  const { contentSelected } = ctx; // TODO: set var when

  let component;
  switch (contentSelected) {
    case 'Minter':
      component = <Minter />;
      break;
    case 'Gallery':
      component = <p>Gallery content</p>;
      break;
    case 'About':
      component = <p>About content</p>;
      break;
    default:
      component = <Wallet />;
  }

  const [selectedWallet, selectWallet] = useState('0');
  const [name, setName] = useState('wallet1');
  const [publicAddress, setPublicAddress] = useState('0x542142..');
  const [amount, setAmount] = useState(0);

  const wallet: WalletState = {
    selectedWallet,
    selectWallet,
    name,
    setName,
    publicAddress,
    setPublicAddress,
    amount,
    setAmount,
  };

  return (
    <WalletContext.Provider value={wallet}>
      <div
        id="content"
        className="bg-light border-right"
        style={{ width: 'auto' }}
      >
        {/* Automatically pass a theme prop to all components in this subtree. */}
        <ThemeProvider skins={SimpleSkins} variables={SimpleDefaults}>
          {component}
        </ThemeProvider>
      </div>
    </WalletContext.Provider>
  );
};

export default Content;
