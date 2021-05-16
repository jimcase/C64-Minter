import React, { useState } from 'react';

interface WalletItem2Props {
  walletName: string;
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  address?: string;
  selected: boolean;
}

// eslint-disable-next-line react/prop-types
const WalletItem: React.FC<WalletItem2Props> = ({
  walletName,
  selected,
}: WalletItem2Props) => {
  const [amount] = useState(0);

  let className = 'walletItem';
  if (selected) {
    className += ' selectedWallet';
  }
  return (
    <div className={className}>
      <h3>{walletName}</h3>
      <p>{amount}</p>
    </div>
  );
};

export default WalletItem;
