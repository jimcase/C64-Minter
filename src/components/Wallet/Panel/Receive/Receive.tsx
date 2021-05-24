import React, { useState, CSSProperties } from 'react';
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
  Input,
} from 'reactstrap';
import classnames from 'classnames';
import * as FaIcons from 'react-icons/fa';
import {
  generateAddress,
  getPublicKeyFromHex,
} from '../../../../lib/WalletLib';
import CardanoModule from '../../../../lib/CardanoModule';
import QrCodeAddress from './QrCodeAddress';

interface StylesDictionary {
  [Key: string]: CSSProperties;
}

const styles: StylesDictionary = {
  listGroupItem: {
    textAlign: 'center',
  },
  input: {
    fontSize: '12px',
    minWidth: '50px',
  },
  newAddress: {
    textAlign: 'center',
    fontSize: '30px',
  },
  address: {
    fontSize: '12px',
  },
  tools: {
    color: 'black',
    fontSize: '20px',
  },
  copyPaste: {
    display: 'inline-block',
    margin: '2px',
    textDecoration: 'none',
    color: 'black',
  },
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ReceiveProps {
  publicKeyHex: string;
  // eslint-disable-next-line react/require-default-props,react/no-unused-prop-types
  externalAddrList: {
    [key: string]: string;
  };
  // eslint-disable-next-line react/require-default-props,react/no-unused-prop-types
  internalAddrList: {
    [key: string]: string;
  };
}

// eslint-disable-next-line react/prop-types,no-empty-pattern
const Receive: React.FC<ReceiveProps> = ({
  publicKeyHex,
  externalAddrList,
  internalAddrList,
}: ReceiveProps) => {
  const [activeTab, setActiveTab] = useState('external');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            className={classnames({ active: activeTab === 'external' })}
            onClick={() => {
              toggle('external');
            }}
          >
            External
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'internal' })}
            onClick={() => {
              toggle('internal');
            }}
          >
            Internal
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="external">
          <Row>
            <Col sm="12">
              <ListGroup>
                {Object.keys(externalAddrList).map((key) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <ListGroupItem
                    key={key}
                    className="justify-content-between"
                    style={styles.listGroupItem}
                  >
                    <Row>
                      <Col sm="2">
                        <Input defaultValue={key} style={styles.input} />
                      </Col>
                      <Col>
                        <em style={styles.address}>{externalAddrList[key]}</em>
                      </Col>
                      <Col>
                        <Badge style={styles.tools} pill>
                          <QrCodeAddress value={externalAddrList[key]} />
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/control-has-associated-label */}
                          <a href="#" style={styles.copyPaste}>
                            <FaIcons.FaCopy />
                          </a>
                        </Badge>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
                <ListGroupItem
                  className="justify-content-between"
                  style={styles.newAddress}
                >
                  <FaIcons.FaPlusCircle />
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="internal">
          <Row>
            <Col sm="12">
              <ListGroup>
                {Object.keys(internalAddrList).map((key) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <ListGroupItem
                    key={key}
                    className="justify-content-between"
                    style={styles.listGroupItem}
                  >
                    <Row>
                      <Col sm="2">
                        <Input defaultValue={key} style={styles.input} />
                      </Col>
                      <Col>
                        <em style={styles.address}>{internalAddrList[key]}</em>
                      </Col>
                      <Col>
                        <Badge style={styles.tools} pill>
                          <QrCodeAddress value={internalAddrList[key]} />
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/control-has-associated-label */}
                          <a href="#" style={styles.copyPaste}>
                            <FaIcons.FaCopy />
                          </a>
                        </Badge>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Receive;
