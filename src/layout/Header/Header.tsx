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

import { Nav, Navbar, NavItem } from 'reactstrap';

import * as FaIcons from 'react-icons/fa';
import { AppContext } from '../Root/Root';

const styles = {
  arrow: {
    margin: '3px',
    fontSize: '30px',
  },
};

const Header: React.FC = () => {
  const ctx = useContext(AppContext);

  const { navOpen, setNavOpen, navDocked, navAnimate } = ctx;

  const icon = navOpen ? (
    <FaIcons.FaArrowCircleLeft style={styles.arrow} />
  ) : (
    <FaIcons.FaArrowCircleRight style={styles.arrow} />
  );

  return (
    <Navbar color="light">
      <Nav>
        <NavItem
          id="navButton"
          className="mx-1"
          onClick={() => setNavOpen(!navOpen)}
          style={{ cursor: 'pointer' }}
        >
          {icon}
        </NavItem>
      </Nav>
      <Nav className="text-muted">
        <NavItem className="mx-1">NavOpen: {JSON.stringify(navOpen)}</NavItem>
        <NavItem className="mx-1">
          NavDocked: {JSON.stringify(navDocked)}
        </NavItem>
        <NavItem className="mx-1">
          NavAnimate: {JSON.stringify(navAnimate)}
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
