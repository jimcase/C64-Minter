import React from 'react';

import WalletInfo from '../WalletInfo'; // we need this to make JSX compile

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

interface IState {
  walletId: string;
}

class Wallet extends React.Component<IProps, IState> {
  // ------------------------------------------^
  constructor(props: IProps) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      walletId: '',
    };
  }

  render() {
    return (
      <div>
        <WalletInfo />
      </div>
    );
  }
}

export default Wallet;
