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

interface HandleWalletProps {
  // eslint-disable-next-line react/require-default-props
  seed?: string[];
}

const HandleWallet: React.FC<HandleWalletProps> = ({
  seed,
}: HandleWalletProps) => {
  const maxTags = 15;
  const minTags = 15;
  let counter = 0;
  const [modal, setModal] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState(seed || []);
  const [walletOptionSelected, selectWalletOption] = useState('');

  const toggle = () => setModal(!modal);
  const handleWalletOption = (op) => selectWalletOption(op);

  // Send the wasmV4 to main
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const saveWalletInStorage = (wallet) => {
    saveWalletInStorageByKey(counter, JSON.stringify(wallet));
    counter += 1;

    // Close modal
    toggle();
  };

  let walletOptionSelectedComponent;
  switch (walletOptionSelected) {
    case 'Restore':
      walletOptionSelectedComponent = (
        <RestoreWallet
          maxTags={maxTags}
          minTags={minTags}
          onChange={(tgs) => {
            setSeedPhrase(tgs);
          }}
        />
      );
      break;
    default:
      walletOptionSelectedComponent = (
        <CreateWallet
          seed={['hello', 'hello']}
          maxTags={15}
          minTags={15}
          onChange={(tgs) => {
            setSeedPhrase(tgs);
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
          <Button color="primary" onClick={toggle}>
            Cancel
          </Button>{' '}
          <Button color="secondary" onClick={toggle} disabled>
            Continue
          </Button>
          <pre>{JSON.stringify(seedPhrase)}</pre>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default HandleWallet;
