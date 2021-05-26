/*
  Copyright (c) 2021, C64 <c64@gmail.com>. All rights reserved.

  Licensed to the Apache Software Foundation (ASF) under one
  or more contributor license agreements.  See the NOTICE file
  distributed with this work for additional information
  regarding copyright ownership.  The ASF licenses this file
  to you under the Apache License, Version 2.0 (the
  "License"); you may not use this file except in compliance
  with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing,
  software distributed under the License is distributed on an
  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, either express or implied.  See the License for the
  specific language governing permissions and limitations
  under the License.
*/

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
