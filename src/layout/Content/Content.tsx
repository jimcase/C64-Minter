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
import { Alert } from 'reactstrap';
import * as FaIcons from 'react-icons/fa';
import { AppContext } from '../Root/Root';
import Minter from '../../views/Minter';
import Wallet from '../../views/Wallet';
import Gallery from '../../views/Gallery';
import Settings from '../../views/Settings';
import Menu from '../../views/Menu';

const Content: React.FC = () => {
  const ctx = useContext(AppContext);

  const { contentSelected } = ctx; // TODO: set var when

  let component;
  switch (contentSelected) {
    case 'Minter':
      component = <Minter />;
      break;
    case 'Wallet':
      component = <Wallet />;
      break;
    case 'Gallery':
      component = <Gallery />;
      break;
    case 'Settings':
      component = <Settings />;
      break;
    default:
      component = <Menu />;
      break;
  }
  return (
    <div
      id="content"
      className="bg-light border-right"
      style={{ width: 'auto' }}
    >
      {/* Automatically pass a theme prop to all components in this subtree. */}
      {component}
      <Alert
        color="success"
        style={{ position: 'fixed', bottom: '0', right: '50px' }}
      >
        <div>
          With{' '}
          <span>
            <FaIcons.FaHeart style={{ color: 'red' }} />
          </span>{' '}
          by{' '}
          <a
            href="https://adapools.org/pool/6b5179aee4db62de5bec35029e4c9b02145366acfec872f1594924db"
            target="_blank"
            rel="noreferrer"
          >
            BOOST
          </a>{' '}
          &{' '}
          <a
            href="https://adapools.org/pool/bd24b3372791f401cc029455c44ea77f3c8750ce3b804a354af0ff16"
            target="_blank"
            rel="noreferrer"
          >
            PEACE
          </a>
        </div>
      </Alert>
    </div>
  );
};

export default Content;
