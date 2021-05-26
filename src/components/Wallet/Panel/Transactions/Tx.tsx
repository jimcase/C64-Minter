/*
  Copyright (c) 2021, C64 <c64@gmail.com>. All rights reserved.

  Licensed to the Apache Software Foundation (ASF) under one
  or more contributor license agreements.  See the NOTICE file
  distributed with this work for additional information
  regarding copyright ownership.  The ASF licenses this file
  to you under the Apache License, Version 2.0 (the
  "License"); you may not use this file except in compliance
  with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing,
  software distributed under the License is distributed on an
  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, either express or implied.  See the License for the
  specific language governing permissions and limitations
  under the License.
*/

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
