import { mnemonicToEntropy, generateMnemonic } from 'bip39';
import * as WasmV4 from '@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib';
import * as WasmV2 from 'cardano-wallet-browser';
import { numbers, networks } from '../config/config';

export const generateMnemonicSeed = (size: number) => {
  return generateMnemonic(size).split(' ');
};

export const generateWalletRootKey = (mnemonic: string) => {
  const bip39entropy = mnemonicToEntropy(mnemonic);
  const EMPTY_PASSWORD = Buffer.from('');
  const rootKey = WasmV4.Bip32PrivateKey.from_bip39_entropy(
    Buffer.from(bip39entropy, 'hex'),
    EMPTY_PASSWORD
  );
  return rootKey;
};

/** Generate a Daedalus /wallet/ to create transactions. Do not save this. Regenerate every time. */
export function getCryptoDaedalusWalletFromMnemonics(
  mnemonic: string
): WasmV2.DaedalusWallet {
  const entropy = WasmV2.Entropy.from_english_mnemonics(mnemonic);
  const wallet = WasmV2.DaedalusWallet.recover(entropy);
  return wallet;
}

/** Generate a Daedalus /wallet/ to create transactions. Do not save this. Regenerate every time.
 * Note: key encoded as hex-string
 */
export function getCryptoDaedalusWalletFromMasterKey(
  masterKeyHex: string
): WasmV2.DaedalusWallet {
  const privateKey = WasmV2.PrivateKey.from_hex(masterKeyHex);
  const wallet = WasmV2.DaedalusWallet.new(privateKey);
  return wallet;
}

/**
 * @param {Bip32PublicKey} accountPubKey:
 * @param {number} chain - 0 or 1
 * @param {number} index
 */
export const generateAddress = (
  accountPubKey: WasmV4.Bip32PublicKey,
  chain: number,
  index: number
) => {
  const chainKey = accountPubKey.derive(chain);
  const addrKey = chainKey.derive(index).to_raw_key();

  // pub. staking key
  const stakingKey = accountPubKey
    .derive(numbers.ChainDerivations.ChimericAccount)
    .derive(numbers.StakingKeyIndex)
    .to_raw_key();

  const addr = WasmV4.BaseAddress.new(
    networks.CardanoMainnet.ChainNetworkId,
    WasmV4.StakeCredential.from_keyhash(addrKey.hash()),
    WasmV4.StakeCredential.from_keyhash(stakingKey.hash())
  );
  return addr.to_address().to_bech32();
};
