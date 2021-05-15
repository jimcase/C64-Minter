// TODO: Figure out how to properly type this

class CardanoModule {
  wasmV2: any;

  wasmV4: any;

  async load(): Promise<void> {
    /* eslint-disable-next-line no-console */
    // console.log('loading Cardano WASM library...');
    if (this.wasmV2 != null && this.wasmV4 != null) {
      /* eslint-disable-next-line no-console */
      // console.log('library seems to be already loaded');
      return;
    }
    this.wasmV2 = await import('cardano-wallet-browser');
    this.wasmV4 = await import(
      '@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib'
    );
    /* eslint-disable-next-line no-console */
    // console.log(this.wasmV4);
  }
}

export default new CardanoModule();
