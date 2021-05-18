import React, { useState } from 'react';
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
  Card,
} from 'reactstrap';
import classnames from 'classnames';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WalletPanelProps {}

// eslint-disable-next-line react/prop-types,no-empty-pattern
const WalletPanel: React.FC<WalletPanelProps> = ({}: WalletPanelProps) => {
  const [activeTab, setActiveTab] = useState('transactions');

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div id="walletPanel">
      <div>
        <Card style={{ marginTop: '40px' }}>
          {' '}
          <span>Total: 0 ₳</span>
          <span>Last tx: 21-04-21</span>
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
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="transactions">
          <Row>
            <Col sm="12">
              <Table size="sm" responsive hover striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>₳</th>
                    <th>Fiat</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Statusgitt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>14-04-2021</td>
                    <td>200</td>
                    <td>2$</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Received</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>13-04-2021</td>
                    <td>100</td>
                    <td>1$</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Sent</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>12-04-2021</td>
                    <td>700</td>
                    <td>7$</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Received</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="receive">
          <Row>
            <Col sm="6">dd</Col>
            <Col sm="6">jj</Col>
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
      </TabContent>
    </div>
  );
};

export default WalletPanel;
