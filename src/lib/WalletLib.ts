import { mnemonicToEntropy, generateMnemonic } from 'bip39';
import cryptoRandomString from 'crypto-random-string';
import { numbers, networks } from '../config/config';
import CardanoModule from './CardanoModule';

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
) => {
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
