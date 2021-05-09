import React from 'react';
import * as FaIcons from 'react-icons/fa';
import WalletInfo from '../WalletInfo';
import WalletItem from '../components/wallet/WalletItem';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IState {
  // ctx: React.Context<any>;
}

class Wallet extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  addWallet = () => {};

  render() {
    return (
      <div>
        <div className="scrollmenu">
          <div id="addWalletButton">
            <FaIcons.FaPlusCircle
              className="sidebarIcons"
              onClick={() => this.addWallet()}
            />
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
  }
}

export default Wallet;
