import React from 'react';

interface IProps {
  name: string;
  amount: number;
  selected: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IState {}

class WalletItem extends React.Component<IProps, IState> {
  // ------------------------------------------^
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, amount, selected } = this.props;

    let className = 'walletItem';
    if (selected) {
      className += ' selectedWallet';
    }
    return (
      <div className={className}>
        <h3>{name}</h3>
        <p>{amount}</p>
      </div>
    );
  }
}

export default WalletItem;
