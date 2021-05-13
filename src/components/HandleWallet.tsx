/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
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

interface HandleWalletProps {
  // eslint-disable-next-line react/require-default-props
  tags: {
    text: string;
    textId: string;
  }[];
  // eslint-disable-next-line react/require-default-props
  onChange?: (tags: { text: string; textId: string }[]) => void;
}

const HandleWallet: React.FC<HandleWalletProps> = ({
  tags,
  onChange,
}: HandleWalletProps) => {
  const maxTags = 15;
  const minTags = 15;
  const [modal, setModal] = useState(false);
  const [mnemonic, setMnemonic] = useState(tags);
  const [walletOptionSelected, selectWalletOption] = useState('');

  const toggle = () => setModal(!modal);
  const handleWalletOption = (op) => selectWalletOption(op);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(mnemonic);
  }, [mnemonic]);

  let walletOptionSelectedComponent;
  switch (walletOptionSelected) {
    case 'Restore':
      walletOptionSelectedComponent = (
        <RestoreWallet
          maxTags={maxTags}
          minTags={minTags}
          onChange={(tgs) => {
            setMnemonic(tgs);
          }}
        />
      );
      break;
    default:
      walletOptionSelectedComponent = (
        <CreateWallet
          tags={[{ text: 'hello', textId: 'hello' }]}
          maxTags={15}
          minTags={15}
          onChange={(tgs) => {
            setMnemonic(tgs);
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
          <pre>{JSON.stringify(mnemonic)}</pre>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default HandleWallet;
