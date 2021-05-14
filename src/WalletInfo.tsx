import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import CardanoModule from './lib/CardanoModule';
import { generateWalletRootKey } from './lib/wallet';
// import { api } from './api';
import List from './components/List';
import { loadSavedData, saveDataInStorage } from './renderer';
import { encryptString } from './utils/crypto-utils';

const { ipcRenderer } = require('electron');
const {
  HANDLE_FETCH_DATA,
  HANDLE_SAVE_DATA,
  HANDLE_REMOVE_DATA,
} = require('./utils/constants');

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
  const [successText, setSuccessText] = useState(null); // from nodejs
  const [val, setVal] = useState('');
  const [itemsToTrack, setItems] = useState([]); // localStorage

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

  // Receives itemsToTrack from main and sets the state
  const handleReceiveData = (_event, data) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setItems([...data.message]);
  };

  // Receives a new item back from main
  const handleNewItem = (_event, data) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setItems([...itemsToTrack, data.message]);
  };

  // Manage state and input field
  const handleChange = (e) => {
    setVal(e.target.value);
  };

  // Send the input to main
  const addItem = (input) => {
    encryptString(input, 'micontraseña')
      .then((en) => saveDataInStorage(en))
      .catch((error) => console.log(error));
    setVal('');
  };

  /*
  useEffect(() => {
    init();
    api
      .get('/test')
      .then(({ data }) => setSuccessText(data))
      .catch((err) => console.error(err));
  }, []);
  */

  // Grab the user's saved itemsToTrack after the app loads
  useEffect(() => {
    loadSavedData();
  }, []);

  // Listener functions that receive messages from main
  useEffect(() => {
    ipcRenderer.on(HANDLE_SAVE_DATA, handleNewItem);
    // If we omit the next step, we will cause a memory leak and & exceed max listeners
    return () => {
      ipcRenderer.removeListener(HANDLE_SAVE_DATA, handleNewItem);
    };
  });
  useEffect(() => {
    ipcRenderer.on(HANDLE_FETCH_DATA, handleReceiveData);
    return () => {
      ipcRenderer.removeListener(HANDLE_FETCH_DATA, handleReceiveData);
    };
  });
  useEffect(() => {
    ipcRenderer.on(HANDLE_REMOVE_DATA, handleReceiveData);
    return () => {
      ipcRenderer.removeListener(HANDLE_REMOVE_DATA, handleReceiveData);
    };
  });

  return (
    <div style={styles.container}>
      <h3>Wallet Info</h3>
      <p style={styles.key}>Master key: {masterKeyHex}</p>

      <div>
        <h3>Persistence</h3>
        <Button variant="outline-primary" onClick={() => addItem(val)}>
          New Item
        </Button>
        <input type="text" onChange={handleChange} value={val} />
        {itemsToTrack.length ? (
          <List itemsToTrack={itemsToTrack} />
        ) : (
          <p>Add an item to get started</p>
        )}
      </div>
    </div>
  );
};

export default WalletInfo;
