import React, { useEffect, useState } from 'react';
import CardanoModule from './lib/CardanoModule';
import { generateWalletRootKey } from './lib/wallet';
import { api } from './api';

const recoveryPhrase = [
  'pelican void shop left ice',
  'glimpse cream dish tongue slice',
  'join supply spoon alone eyebrow',
].join(' ');

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  key: {
    width: '250p',
    overflowWrap: 'break-word',
  },
};

const WalletInfo = () => {
  const [masterKeyHex, setMasterKeyHex] = useState<string>('');
  const [successText, setSuccessText] = useState(null);

  const init = async () => {
    // TODO: need to figure out what's the best way to load module at app
    // startup
    await CardanoModule.load();
    const masterKeyPtr = generateWalletRootKey(recoveryPhrase);
    const masterKey = Buffer.from(masterKeyPtr.as_bytes(), 'hex').toString(
      'hex'
    );
    /* eslint-disable-next-line no-console */
    console.log('wallet master key:', masterKey);
    setMasterKeyHex(masterKey);
  };

  useEffect(() => {
    init();
    api
      .get('/test')
      .then(({ data }) => setSuccessText(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <h3>Wallet Info</h3>
      <p style={styles.key}>Master key: {masterKeyHex}</p>
      <h4>Server side</h4>
      <p>{successText}</p>
    </div>
  );
};

export default WalletInfo;
