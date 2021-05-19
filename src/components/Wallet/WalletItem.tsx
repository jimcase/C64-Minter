import React, { useState } from 'react';

interface WalletItemProps {
  walletName: string;
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  address?: string;
  selected: boolean;
}

// eslint-disable-next-line react/prop-types
const WalletItem: React.FC<WalletItemProps> = ({
  walletName,
  selected,
}: WalletItemProps) => {
  const [amount] = useState(0);

  let className = 'walletItem';
  if (selected) {
    className += ' selectedWallet';
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={className}>
      <h3>{walletName}</h3>
      <p>{amount}</p>
    </div>
  );
};

export default WalletItem;
