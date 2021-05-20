import React, { useState } from 'react';
import { Col, Row, Card, CardBody, Collapse } from 'reactstrap';
import * as FaIcons from 'react-icons/fa';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TransactionsProps {}

// eslint-disable-next-line react/prop-types,no-empty-pattern
const Transactions: React.FC<TransactionsProps> = ({}: TransactionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Card>
      <Row>
        <Col>
          <Row>
            <Col style={{ textAlign: 'center' }}>Date</Col>
            <Col>Amount</Col>
            <Col>Status</Col>
          </Row>
        </Col>
        <Col sm={1}>
          <FaIcons.FaChevronDown className="" onClick={toggle} />
        </Col>
      </Row>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <div>From: </div>
            <div>To: </div>
            <div>Tx id: </div>
          </CardBody>
        </Card>
      </Collapse>
    </Card>
  );
};

export default Transactions;
