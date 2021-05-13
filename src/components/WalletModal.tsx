/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

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

const WalletModal = (props) => {
  const { className } = props;

  const [modal, setModal] = useState(false);
  const [walletOptionSelected, selectWalletOption] = useState('');

  const toggle = () => setModal(!modal);
  const handleWalletOption = (op) => selectWalletOption(op);

  let walletOptionSelectedComponent;
  switch (walletOptionSelected) {
    case 'Restore':
      walletOptionSelectedComponent = <RestoreWallet />;
      break;
    default:
      walletOptionSelectedComponent = (
        <CreateWallet tags={[{ text: 'hello', textId: 'hello' }]} />
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
        className={className}
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
          <Button color="secondary" onClick={toggle}>
            Continue
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default WalletModal;
