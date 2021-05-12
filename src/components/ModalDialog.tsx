/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as FaIcons from 'react-icons/fa';
import MnemonicInput from './MnemonicInput';

const ModalDialog = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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
        <ModalHeader toggle={toggle}>Add wallet</ModalHeader>
        <ModalBody>
          <MnemonicInput />
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

export default ModalDialog;
