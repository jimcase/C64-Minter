import React, { useState } from 'react';
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Card,
  Jumbotron,
} from 'reactstrap';
import classnames from 'classnames';
import Transactions from './Transactions/Transactions';
import Receive from './Receive/Receive';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WalletPanelProps {
  // eslint-disable-next-line react/require-default-props
  wallet: {
    name: string;
    encryptedMasterKey: string;
    publicKeyHex: string;
    internalPubAddress: string;
    externalPubAddress: string;
  };
}

// eslint-disable-next-line react/prop-types,no-empty-pattern
const WalletPanel: React.FC<WalletPanelProps> = ({
  wallet,
}: WalletPanelProps) => {
  const [activeTab, setActiveTab] = useState('transactions');

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div id="walletPanel">
      <div>
        <Card style={{ marginTop: '40px' }}>
          <Jumbotron style={{ padding: '15px' }}>
            <h1 className="display-3">{wallet.name}</h1>
            <h3>
              <strong>3301 ₳</strong>
            </h3>
            <hr className="my-2" />
            <p>
              <strong>Encrypted MasterKey:</strong>{' '}
              {wallet.encryptedMasterKey[0]}...
              {wallet.encryptedMasterKey[wallet.encryptedMasterKey.length - 1]}
            </p>
            <p>
              <strong>PublicKey:</strong> {wallet.publicKeyHex}
            </p>
            <p>
              <strong>Internal PublicAddress:</strong>{' '}
              {wallet.internalPubAddress}
            </p>
            <p>
              <strong>External PublicAddress:</strong>{' '}
              {wallet.externalPubAddress}
            </p>
          </Jumbotron>
        </Card>
      </div>
      <Nav tabs style={{ marginTop: '40px' }}>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'transactions' })}
            onClick={() => {
              toggleTab('transactions');
            }}
          >
            Transactions
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'receive' })}
            onClick={() => {
              toggleTab('receive');
            }}
          >
            Receive
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'send' })}
            onClick={() => {
              toggleTab('send');
            }}
          >
            Send
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'tokens' })}
            onClick={() => {
              toggleTab('tokens');
            }}
          >
            NFTs
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames(
              { active: activeTab === 'settings' },
              'ml-auto'
            )}
            onClick={() => {
              toggleTab('settings');
            }}
          >
            Settings
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="transactions">
          <Transactions />
        </TabPane>
        <TabPane tabId="receive">
          <Row>
            <Receive publicKeyHex={wallet.publicKeyHex} />
          </Row>
        </TabPane>
        <TabPane tabId="send">
          <Row>
            <Col sm="6">1dd</Col>
            <Col sm="6">j2j</Col>
          </Row>
        </TabPane>
        <TabPane tabId="tokens">
          <Row>
            <Col sm="6">tokens1</Col>
            <Col sm="6">tokens2</Col>
          </Row>
        </TabPane>
        <TabPane tabId="settings">
          <Row>
            <Col sm="6">change name</Col>
            <Col sm="6">delete</Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default WalletPanel;
