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

import React, { useContext } from 'react';
import { Row, Col } from 'reactstrap';
import { AppContext } from '../layout/Root/Root';

const styles = {
  optionsContainer: {
    padding: '15px',
    marginTop: '100px',
  },
  menuOption: {
    textAlign: 'center',
    padding: '10px',
  },
  menuButton: {
    width: '100%',
    minHeight: '200px',
  },
  buttonTitle: {
    fontSize: '40px',
    fontFamily: 'commodoreFont',
  },
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MenuProps {}

// eslint-disable-next-line react/prop-types
const Menu: React.FC<MenuProps> = () => {
  const ctx = useContext(AppContext);

  const { selectContent } = ctx;

  return (
    <div id="menuView" style={{ height: '100%' }}>
      <div style={{ padding: '15px' }}>
        <h1 className="display-3">Welcome</h1>
        <hr className="my-2" />
        <div style={styles.optionsContainer}>
          <Row>
            <Col sm={6}>
              <div style={styles.menuOption}>
                {/* eslint-disable-next-line react/button-has-type */}
                <button
                  style={styles.menuButton}
                  onClick={() => selectContent('Gallery')}
                >
                  <span style={styles.buttonTitle}>Gallery</span>
                </button>
              </div>
            </Col>
            <Col sm={6}>
              <div style={styles.menuOption}>
                {/* eslint-disable-next-line react/button-has-type */}
                <button
                  style={styles.menuButton}
                  onClick={() => selectContent('Minter')}
                >
                  <span style={styles.buttonTitle}>Mint NFTs</span>
                </button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <div style={styles.menuOption}>
                {/* eslint-disable-next-line react/button-has-type */}
                <button
                  style={styles.menuButton}
                  onClick={() => selectContent('Wallet')}
                >
                  <span style={styles.buttonTitle}>Wallet</span>
                </button>
              </div>
            </Col>
            <Col sm={6}>
              <div style={styles.menuOption}>
                {/* eslint-disable-next-line react/button-has-type */}
                <button
                  style={styles.menuButton}
                  onClick={() => selectContent('Settings')}
                >
                  <span style={styles.buttonTitle}>Settings</span>
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Menu;
