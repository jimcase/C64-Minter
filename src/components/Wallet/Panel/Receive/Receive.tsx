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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ReceiveProps {
  publicKeyHex: string;
  // eslint-disable-next-line react/require-default-props
  externalAddrList?: string[];
  // eslint-disable-next-line react/require-default-props
  internalAddrList?: string[];
}

// eslint-disable-next-line react/prop-types,no-empty-pattern
const Receive: React.FC<ReceiveProps> = ({
  publicKeyHex,
  externalAddrList,
  internalAddrList,
}: ReceiveProps) => {
  const [activeTab, setActiveTab] = useState('1');
  const [externalAddressList, setExternalAddressList] = useState(
    externalAddrList || []
  );
  const [internalAddressList, setInternalAddressList] = useState(
    internalAddrList || []
  );

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

  useEffect(() => {
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
                {externalAddressList.map((addr) => (
                  <ListGroupItem
                    key={addr}
                    className="justify-content-between"
                    style={{ textAlign: 'center' }}
                  >
                    {addr}
                    <Badge style={{ color: 'black', fontSize: '20px' }} pill>
                      <FaIcons.FaCopy />
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
                {internalAddressList.map((addr) => (
                  <ListGroupItem
                    key={addr}
                    className="justify-content-between"
                    style={{ textAlign: 'center' }}
                  >
                    {addr}
                    <Badge style={{ color: 'black', fontSize: '20px' }} pill>
                      <FaIcons.FaCopy />
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
