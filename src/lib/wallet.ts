import { mnemonicToEntropy } from 'bip39';
import { numbers, networks } from '../config/config';
import CardanoModule from './CardanoModule';

export const generateWalletRootKey = (mnemonic: string) => {
  const bip39entropy = mnemonicToEntropy(mnemonic);
  const EMPTY_PASSWORD = Buffer.from('');
  const rootKey = CardanoModule.wallet.Bip32PrivateKey.from_bip39_entropy(
    Buffer.from(bip39entropy, 'hex'),
    EMPTY_PASSWORD
  );
  return rootKey;
};

/**
 * @param {Bip32PublicKey} accountPubKey:
 * @param {number} chain - 0 or 1
 * @param {number} index
 */
export const generateAddress = (
  accountPubKey: CardanoModule.wallet.Bip32PublicKey,
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

  const addr = CardanoModule.wallet.BaseAddress.new(
    networks.CardanoMainnet.ChainNetworkId,
    CardanoModule.wallet.StakeCredential.from_keyhash(addrKey.hash()),
    CardanoModule.wallet.StakeCredential.from_keyhash(stakingKey.hash())
  );
  return addr.to_address().to_bech32();
};
