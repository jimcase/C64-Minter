import React from 'react';
import { Col, Row } from 'reactstrap';
import Tx from './Tx';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TransactionsProps {}

// eslint-disable-next-line react/prop-types,no-empty-pattern
const Transactions: React.FC<TransactionsProps> = ({}: TransactionsProps) => {
  return (
    <div>
      <Row>
        <Col sm="12">
          <Tx />
          <Tx />
        </Col>
      </Row>
    </div>
  );
};

export default Transactions;
