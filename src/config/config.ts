export const numbers = {
  HardDerivationStart: 2147483648,
  Bip44DerivationLevels: {
    Root: 0,
    Purpose: 1,
    CoinType: 2,
    Account: 3,
    Chain: 4,
    Address: 5,
  },
  ChainDerivations: {
    External: 0,
    Internal: 1,
    ChimericAccount: 2,
  },
  CoinTypes: {
    Cardano: 2147485463, // HARD_DERIVATION_START + 1815;
  },
  StakingKeyIndex: 0,
};

export const networks = {
  CardanoMainnet: {
    ChainNetworkId: 1,
  },
  CardanoTestnet: {
    ChainNetworkId: 1097911063,
  },
};

export const config = {};
