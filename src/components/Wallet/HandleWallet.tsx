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
import { saveWalletInStorageByKey } from '../../renderer';
import {
  generateWalletRootKey,
  encryptWithPassword,
  generateAddress,
} from '../../lib/WalletLib';
import CardanoModule from '../../lib/CardanoModule';

interface HandleWalletProps {
  // eslint-disable-next-line react/require-default-props
  seed?: string[];
  // eslint-disable-next-line react/require-default-props
  onAddWallet?: () => void;
}

const HandleWallet: React.FC<HandleWalletProps> = ({
  seed,
  onAddWallet,
}: HandleWalletProps) => {
  const maxTags = 15;
  const minTags = 15;
  const [modal, setModal] = useState(false);
  const [invalidMnemonic, setInvalidMnemonic] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState(seed || []);
  const [walletName, setWalletName] = useState('');
  const [spendingPassword, setSpendingPassword] = useState('');
  const [walletOptionSelected, selectWalletOption] = useState('');

  const toggle = () => setModal(!modal);
  const handleWalletOption = (option) => selectWalletOption(option);

  const isValidWallet = (wallet: {
    masterKey: string;
    name: string;
  }): boolean => {
    // console.log(Wallet.masterKey.length > 0 && Wallet.name.length > 0);
    return wallet.masterKey.length > 0 && wallet.name.length > 0;
  };

  const saveWalletInStorage = async (
    phrase: string,
    name: string,
    password: string
  ) => {
    CardanoModule.load()
      .then(() => {
        // eslint-disable-next-line promise/always-return
        try {
          const masterKeyPtr = generateWalletRootKey(phrase);
          const masterKeyBytes = masterKeyPtr.as_bytes();
          // const publicKey = masterKeyPtr.to_public();
          const publicKeyHex = Buffer.from(
            masterKeyPtr.to_public().as_bytes(),
            'hex'
          ).toString('hex');
          const encryptedMasterKey = encryptWithPassword(
            password,
            masterKeyBytes
          );

          const internalPubAddress = generateAddress(
            masterKeyPtr.to_public(),
            1,
            1
          );
          const externalPubAddress = generateAddress(
            masterKeyPtr.to_public(),
            0,
            1
          );
          saveWalletInStorageByKey(
            JSON.stringify({
              name,
              encryptedMasterKey,
              publicKeyHex,
              internalPubAddress: [internalPubAddress],
              externalPubAddress: [externalPubAddress],
            })
          );
          // Close modal
          toggle();
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          onAddWallet && onAddWallet();
        } catch (e) {
          setInvalidMnemonic(true);
          console.log(`Error while generating root key: ${e}`);
        }
      })
      .catch((e) => console.log(e));
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
          onChangeSpendingPassword={(pass: string) => {
            setSpendingPassword(pass);
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
          onChangeSpendingPassword={(pass: string) => {
            setSpendingPassword(pass);
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
              saveWalletInStorage(
                seedPhrase.join(' '),
                walletName,
                spendingPassword
              )
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
          <p>{spendingPassword}</p>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default HandleWallet;
