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

import Sidebar from 'react-sidebar';

import Nav from '../Nav/Nav';
import { AppContext } from '../Root/Root';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NavWrapperProps {}

// eslint-disable-next-line react/prop-types
const NavWrapper: React.FC<NavWrapperProps> = ({ children }) => {
  const ctx = useContext(AppContext);

  const { navOpen, setNavOpen, navDocked, navAnimate } = ctx;

  return (
    <Sidebar
      sidebarId="leftSidebar"
      sidebar={<Nav />}
      open={navOpen}
      docked={navDocked && navOpen}
      onSetOpen={setNavOpen}
      styles={{ sidebar: { background: 'white', color: 'black' } }}
      shadow={false}
      transitions={navAnimate}
    >
      {children}
    </Sidebar>
  );
};

export default NavWrapper;
