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
import MnemonicInput from './MnemonicInput';

const WalletModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [mnemonicPhrase, setMnemonicPhrase] = useState([]);
  const [walletOptionSelected, selectWalletOption] = useState('');

  const toggle = () => setModal(!modal);
  const setMnemonicInput = (m) => setMnemonicPhrase(m);
  const handleWalletOption = (op) => selectWalletOption(op);

  let walletOptionSelectedComponent;
  switch (walletOptionSelected) {
    case 'Restore':
      walletOptionSelectedComponent = (
        <MnemonicInput parentCallback={(m) => setMnemonicInput(m)} />
      );
      break;
    default:
      walletOptionSelectedComponent = <p>Create</p>;
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
          <h4>callback:</h4>
          <h4>{mnemonicPhrase}</h4>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default WalletModal;
