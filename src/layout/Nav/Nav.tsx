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
import * as FaIcons from 'react-icons/fa';
import { AppContext } from '../Root/Root';

const styles = {
  nav: {
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
  },
};

const Nav: React.FC = () => {
  const ctx = useContext(AppContext);

  const { selectContent } = ctx;

  return (
    <div
      id="navBar"
      className="bg-light border-right"
      style={{ width: 'auto', height: '100%' }}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div id="navBrand" onClick={() => selectContent('Menu')}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">C64</a>
      </div>
      <ul style={styles.nav}>
        <li>
          <FaIcons.FaWallet
            className="sidebarIcons"
            onClick={() => selectContent('Wallet')}
          />
        </li>
        <li>
          <FaIcons.FaPuzzlePiece
            className="sidebarIcons"
            onClick={() => selectContent('Minter')}
          />
        </li>
        <li>
          <FaIcons.FaImages
            className="sidebarIcons"
            onClick={() => selectContent('Gallery')}
          />
        </li>
        <li style={{ marginTop: 'auto' }}>
          <FaIcons.FaTools
            className="sidebarIcons"
            onClick={() => selectContent('Settings')}
          />
        </li>
      </ul>
    </div>
  );
};

export default Nav;
