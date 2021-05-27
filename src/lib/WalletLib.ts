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

import { mnemonicToEntropy, generateMnemonic } from 'bip39';
import cryptoRandomString from 'crypto-random-string';
import { numbers, networks } from '../config/config';
import CardanoModule from './CardanoModule';
import { getProtocolParams } from '../utils/adrestia/cardano-graphql';

export const generateMnemonicSeed = (size: number) => {
  return generateMnemonic(size).split(' ');
};

export const generateWalletRootKey = (mnemonic: string) => {
  const bip39entropy = mnemonicToEntropy(mnemonic);
  const EMPTY_PASSWORD = Buffer.from('');
  const rootKey = CardanoModule.wasmV4.Bip32PrivateKey.from_bip39_entropy(
    Buffer.from(bip39entropy, 'hex'),
    EMPTY_PASSWORD
  );
  return rootKey;
};
export const getPublicKeyFromHex = (publicKeyHex: string) => {
  return CardanoModule.wasmV4.Bip32PublicKey.from_bytes(
    Buffer.from(publicKeyHex, 'hex')
  );
};

/** Generate a Daedalus /wasmV4/ to create transactions. Do not save this. Regenerate every time. */
export const getCryptoDaedalusWalletFromMnemonics = (mnemonic: string) => {
  const entropy = CardanoModule.wasmV2.Entropy.from_english_mnemonics(mnemonic);
  const wallet = CardanoModule.wasmV2.DaedalusWallet.recover(entropy);
  return wallet;
};

/** Generate a Daedalus /wasmV4/ to create transactions. Do not save this. Regenerate every time.
 * Note: key encoded as hex-string
 */
export const getCryptoDaedalusWalletFromMasterKey = (masterKeyHex: string) => {
  const privateKey = CardanoModule.wasmV2.PrivateKey.from_hex(masterKeyHex);
  const wallet = CardanoModule.wasmV2.DaedalusWallet.new(privateKey);
  return wallet;
};

/**
 * @param {Bip32PublicKey} accountPubKey:
 * @param {number} chain - 0 or 1, ExpectedSoftDerivation
 * @param {number} index
 */
export const generateAddress = (
  accountPubKey: CardanoModule.wasmV4.Bip32PublicKey,
  chain: number,
  index: number
): string => {
  const chainKey = accountPubKey.derive(chain);
  const addrKey = chainKey.derive(index).to_raw_key();

  // pub. staking key
  const stakingKey = accountPubKey
    .derive(numbers.ChainDerivations.ChimericAccount)
    .derive(numbers.StakingKeyIndex)
    .to_raw_key();

  const addr = CardanoModule.wasmV4.BaseAddress.new(
    networks.CardanoMainnet.ChainNetworkId,
    CardanoModule.wasmV4.StakeCredential.from_keyhash(addrKey.hash()),
    CardanoModule.wasmV4.StakeCredential.from_keyhash(stakingKey.hash())
  );
  return addr.to_address().to_bech32();
};

// From Yoroi Frontend: passwordCipher.js
export function encryptWithPassword(
  password: string,
  bytes: Uint8Array
): string {
  const salt = Buffer.from(cryptoRandomString(2 * 32), 'hex');
  const nonce = Buffer.from(cryptoRandomString(2 * 12), 'hex');
  const encryptedBytes = CardanoModule.wasmV2.password_encrypt(
    password,
    salt,
    nonce,
    bytes
  );
  return Buffer.from(encryptedBytes).toString('hex');
}

// From Yoroi Frontend: passwordCipher.js
export function decryptWithPassword(
  password: string,
  encryptedHex: string
): Uint8Array {
  const encryptedBytes = Buffer.from(encryptedHex, 'hex');
  let decryptedBytes;
  try {
    decryptedBytes = CardanoModule.wasmV2.password_decrypt(
      password,
      encryptedBytes
    );
  } catch (err) {
    console.log(err);
  }
  return decryptedBytes;
}

export const buildTransaction = async (
  currentSlot: number,
  shelleyOutputAddr: string,
  shelleyChangeAddr: string,
  valueToSend: string,
  rootKey: string
) => {
  // Get current protocol parame
  const protocolParams = await getProtocolParams();

  // instantiate the tx builder with the Cardano protocol parameters - these may change later on
  const txBuilder = CardanoModule.wasmV4.TransactionBuilder.new(
    // all of these are taken from the mainnet genesis settings
    // linear fee parameters (a*size + b)
    CardanoModule.wasmV4.LinearFee.new(
      CardanoModule.wasmV4.BigNum.from_str(protocolParams.minFeeA),
      CardanoModule.wasmV4.BigNum.from_str(protocolParams.minFeeB)
    ),
    // minimum utxo value
    CardanoModule.wasmV4.BigNum.from_str(protocolParams.minUTxOValue), // min. send 1 Ada
    // pool deposit
    CardanoModule.wasmV4.BigNum.from_str(protocolParams.poolDeposit),
    // key deposit
    CardanoModule.wasmV4.BigNum.from_str(protocolParams.keyDeposit)
  );

  // set ttl
  txBuilder.set_ttl(currentSlot + 1500);

  // add a keyhash input - for ADA held in a Shelley-era normal address (Base, Enterprise, Pointer)
  const prvKey = CardanoModule.wasmV4.PrivateKey.from_bech32(rootKey);
  txBuilder.add_key_input(
    prvKey.to_public().hash(),
    CardanoModule.wasmV4.TransactionInput.new(
      CardanoModule.wasmV4.TransactionHash.from_bytes(
        Buffer.from(
          '8561258e210352fba2ac0488afed67b3427a27ccf1d41ec030c98a8199bc22ec',
          'hex'
        )
      ), // tx hash
      0 // index
    ),
    CardanoModule.wasmV4.Value.new(
      CardanoModule.wasmV4.BigNum.from_str(valueToSend)
    )
  );

  // example: addr_test1qpu5vlrf4xkxv2qpwngf6cjhtw542ayty80v8dyr49rf5ewvxwdrt70qlcpeeagscasafhffqsxy36t90ldv06wqrk2qum8x5w
  const shelleyOutputAddress =
    CardanoModule.wasmV4.Address.from_bech32(shelleyOutputAddr);

  // add output to the tx
  txBuilder.add_output(
    CardanoModule.wasmV4.TransactionOutput.new(
      shelleyOutputAddress,
      CardanoModule.wasmV4.Value.new(
        CardanoModule.wasmV4.BigNum.from_str(valueToSend)
      )
    )
  );

  // addr_test1gz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzerspqgpsqe70et
  const shelleyChangeAddress =
    CardanoModule.wasmV4.Address.from_bech32(shelleyChangeAddr);
  // calculate the min fee required and send any change to an address
  txBuilder.add_change_if_needed(shelleyChangeAddress);

  // once the transaction is ready, we build it to get the tx body without witnesses
  const txBody = txBuilder.build();
  const txHash = CardanoModule.wasmV4.hash_transaction(txBody);
  const witnesses = CardanoModule.wasmV4.TransactionWitnessSet.new();

  // add keyhash witnesses
  const vkeyWitnesses = CardanoModule.wasmV4.VkeyWitnesses.new();
  const vkeyWitness = CardanoModule.wasmV4.make_vkey_witness(txHash, prvKey);
  vkeyWitnesses.add(vkeyWitness);
  witnesses.set_vkeys(vkeyWitnesses);

  // create the finalized transaction with witnesses
  const transaction = CardanoModule.wasmV4.Transaction.new(
    txBody,
    witnesses,
    undefined // transaction metadata, TransactionMetadata obj
  );
  return transaction;
};
