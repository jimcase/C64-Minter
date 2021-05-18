import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from 'reactstrap';
import * as FaIcons from 'react-icons/fa';
import RestoreWallet from './RestoreWallet';
import CreateWallet from './CreateWallet';
import { saveWalletInStorageByKey } from '../renderer';
import { generateWalletRootKey } from '../lib/wallet';
import CardanoModule from '../lib/CardanoModule';

interface HandleWalletProps {
  // eslint-disable-next-line react/require-default-props
  seed?: string[];
}

const HandleWallet: React.FC<HandleWalletProps> = ({
  seed,
}: HandleWalletProps) => {
  const maxTags = 15;
  const minTags = 15;
  const [modal, setModal] = useState(false);
  const [invalidMnemonic, setInvalidMnemonic] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState(seed || []);
  const [walletName, setWalletName] = useState('');
  const [walletOptionSelected, selectWalletOption] = useState('');

  const toggle = () => setModal(!modal);
  const handleWalletOption = (option) => selectWalletOption(option);

  const isValidWallet = (wallet: {
    masterKey: string;
    name: string;
  }): boolean => {
    // console.log(wallet.masterKey.length > 0 && wallet.name.length > 0);
    return wallet.masterKey.length > 0 && wallet.name.length > 0;
  };

  const saveWalletInStorage = async (phrase: string, name: string) => {
    try {
      await CardanoModule.load(); // TODO: add then
      const masterKeyPtr = generateWalletRootKey(phrase);
      const masterKey = Buffer.from(masterKeyPtr.as_bytes(), 'hex').toString(
        'hex'
      );

      // TODO: save masterKey
      saveWalletInStorageByKey(JSON.stringify({ name, masterKey }));
      // Close modal
      toggle();
      // TODO: update wallets array in react with callback
    } catch (e) {
      setInvalidMnemonic(true);
      console.log(`Error while generating root key: ${e}`);
    }
  };

  let walletOptionSelectedComponent;
  switch (walletOptionSelected) {
    case 'Restore':
      walletOptionSelectedComponent = (
        <RestoreWallet
          maxTags={maxTags}
          minTags={minTags}
          onChange={(tgs: string[]) => {
            setSeedPhrase(tgs);
          }}
          onChangeName={(wName: string) => {
            setWalletName(wName);
          }}
        />
      );
      break;
    default:
      walletOptionSelectedComponent = (
        <CreateWallet
          maxTags={15}
          minTags={15}
          onChange={(tgs: string[]) => {
            setSeedPhrase(tgs);
          }}
          onChangeName={(wName: string) => {
            setWalletName(wName);
          }}
        />
      );
  }

  return (
    <div>
      <Button id="addWalletButton">
        <FaIcons.FaPlusCircle className="sidebarIcons" onClick={toggle} />
      </Button>

      <Modal
        isOpen={modal}
        toggle={toggle}
        size="lg"
        keyboard={false}
        centered
        backdrop="static"
      >
        <ModalHeader>
          <h3>Wallet</h3>
          <Row>
            <Col>
              <Button onClick={() => handleWalletOption('Create')}>
                Create
              </Button>
            </Col>
            <Col>
              <Button onClick={() => handleWalletOption('Restore')}>
                Restore
              </Button>
            </Col>
          </Row>
        </ModalHeader>
        <ModalBody>
          {/*  */}
          {walletOptionSelectedComponent}
        </ModalBody>
        <ModalFooter>
          {invalidMnemonic ? (
            <p style={{ color: 'red' }}>Invalid Mnemonic</p>
          ) : null}
          <Button color="primary" onClick={toggle}>
            Cancel
          </Button>{' '}
          <Button
            color="secondary"
            onClick={() =>
              saveWalletInStorage(seedPhrase.join(' '), walletName)
            }
            disabled={
              !isValidWallet({
                masterKey: seedPhrase.join(' '),
                name: walletName,
              })
            }
          >
            Continue
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default HandleWallet;
