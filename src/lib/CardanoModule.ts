// TODO: Figure out how to properly type this

// import * as Wallet from '@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib';
//
// import type Wallet from '@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib';

class CardanoModule {
  wallet: Wallet;

  async load(): Promise<void> {
    /* eslint-disable-next-line no-console */
    console.log('loading Cardano WASM library...');
    if (this.wallet != null) {
      /* eslint-disable-next-line no-console */
      console.log('library seems to be already loaded');
      return;
    }
    this.wallet = await import(
      '@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib'
    );
    /* eslint-disable-next-line no-console */
    console.log(this.wallet);
  }
}

export default new CardanoModule();
