import React from 'react';
import { Col, Row, Table } from 'reactstrap';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TransactionsProps {}

// eslint-disable-next-line react/prop-types,no-empty-pattern
const Transactions: React.FC<TransactionsProps> = ({}: TransactionsProps) => {
  return (
    <div>
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
                <th>Status</th>
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
    </div>
  );
};

export default Transactions;
