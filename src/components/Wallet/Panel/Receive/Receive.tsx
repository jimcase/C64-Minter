import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'reactstrap';
import classnames from 'classnames';
import * as FaIcons from 'react-icons/fa';
import {
  generateAddress,
  getPublicKeyFromHex,
} from '../../../../lib/WalletLib';
import CardanoModule from '../../../../lib/CardanoModule';
import QrCodeAddress from './QrCodeAddress';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ReceiveProps {
  publicKeyHex: string;
  // eslint-disable-next-line react/require-default-props
  externalAddrList: string[];
  // eslint-disable-next-line react/require-default-props
  internalAddrList: string[];
}

// eslint-disable-next-line react/prop-types,no-empty-pattern
const Receive: React.FC<ReceiveProps> = ({
  publicKeyHex,
  externalAddrList,
  internalAddrList,
}: ReceiveProps) => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const getAddress = async (chain: number, index: number): Promise<string> => {
    return CardanoModule.load()
      .then(() => {
        return generateAddress(getPublicKeyFromHex(publicKeyHex), chain, index);
      })
      .catch((e) => {
        console.log(e);
        return '';
      });
  };
  /*
  // Pasar las direcciones solo como props y con una callback actualizar/ampliar
  useEffect(() => {
    // External address for receive payments
    const addressesList: string[] = [];
    // eslint-disable-next-line promise/catch-or-return,promise/always-return
    getAddress(0, 1)
      // eslint-disable-next-line promise/always-return
      .then((r) => {
        addressesList.push(r);
        setExternalAddressList(addressesList);
      })
      .catch((e) => console.log(e));

    // Internal address for exchange in tx
    const addressesList2: string[] = [];
    // eslint-disable-next-line promise/catch-or-return,promise/always-return
    getAddress(1, 1)
      // eslint-disable-next-line promise/always-return
      .then((r) => {
        addressesList2.push(r);
        setInternalAddressList(addressesList2);
      })
      .catch((e) => console.log(e));
  }, []);

  */
  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            External
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Internal
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <ListGroup>
                {externalAddrList.map((addr) => (
                  <ListGroupItem
                    key={addr}
                    className="justify-content-between"
                    style={{ textAlign: 'center' }}
                  >
                    {addr}
                    <Badge style={{ color: 'black', fontSize: '20px' }} pill>
                      <QrCodeAddress value={addr} />
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/control-has-associated-label */}
                      <a
                        href="#"
                        style={{
                          display: 'inline-block',
                          margin: '2px',
                          textDecoration: 'none',
                          color: 'black',
                        }}
                      >
                        <FaIcons.FaCopy />
                      </a>
                    </Badge>
                  </ListGroupItem>
                ))}
                <ListGroupItem
                  className="justify-content-between"
                  style={{ textAlign: 'center', fontSize: '30px' }}
                >
                  <FaIcons.FaPlusCircle />
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <ListGroup>
                {internalAddrList.map((addr2) => (
                  <ListGroupItem
                    key={addr2}
                    className="justify-content-between"
                    style={{ textAlign: 'center' }}
                  >
                    {addr2}
                    <Badge style={{ color: 'black', fontSize: '20px' }} pill>
                      <QrCodeAddress value={addr2} />
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/control-has-associated-label */}
                      <a
                        href="#"
                        style={{
                          display: 'inline-block',
                          margin: '2px',
                          textDecoration: 'none',
                          color: 'black',
                        }}
                      >
                        <FaIcons.FaCopy />
                      </a>
                    </Badge>
                  </ListGroupItem>
                ))}
                <ListGroupItem
                  className="justify-content-between"
                  style={{ textAlign: 'center', fontSize: '30px' }}
                >
                  <FaIcons.FaPlusCircle />
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Receive;
