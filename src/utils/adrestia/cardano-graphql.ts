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

// eslint-disable-next-line import/prefer-default-export
import axios from 'axios';

export function cardanoWalletSendTxThruGraphql() {}

export async function getProtocolParams() {
  const protocolParamsQuery =
    '{ genesis { shelley { protocolParams { a0 decentralisationParam eMax extraEntropy keyDeposit maxBlockBodySize maxBlockHeaderSize maxTxSize minFeeA minFeeB minPoolCost minUTxOValue nOpt poolDeposit protocolVersion rho tau } } } }';
  const protocolParamsResult = await axios.post(
    'https://graphql-api.testnet.dandelion.link/',
    { query: protocolParamsQuery }
  );
  return protocolParamsResult.data.data.genesis.shelley.protocolParams;
}
export async function getCurrentSlot() {
  const protocolParamsQuery =
    '{ genesis { shelley { protocolParams { a0 decentralisationParam eMax extraEntropy keyDeposit maxBlockBodySize maxBlockHeaderSize maxTxSize minFeeA minFeeB minPoolCost minUTxOValue nOpt poolDeposit protocolVersion rho tau } } } }';
  const protocolParamsResult = await axios.post(
    'https://graphql-api.testnet.dandelion.link/',
    { query: protocolParamsQuery }
  );
  return protocolParamsResult.data.data.genesis.shelley.protocolParams;
}
