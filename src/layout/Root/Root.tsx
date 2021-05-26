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

import React, { useEffect, useState } from 'react';

import Media from 'react-media';

const { ENDPOINTS, NETWORK } = require('../../utils/settings/constants');

const BootrapBreakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
};

interface AppState {
  // Layout
  navAnimate: boolean;
  navBreakpoint: 'xs' | 'sm' | 'md' | 'lg';
  navOpen: boolean;
  navDocked: boolean;
  navWidth: number;
  contentSelected: string;
  setNavOpen: (open: boolean) => void;
  setNavDocked: (docked: boolean) => void;
  selectContent: (content: string) => void;

  // Settings
  networkSelected: { network: string };
  setNetwork: (network: { network: string }) => void;
  endpointSelected: { mainnet: string; testnet: string };
  setEndpoint: (endpoint: { mainnet: string; testnet: string }) => void;
}

export const AppContext = React.createContext<AppState>({
  // Layout
  navAnimate: true,
  navBreakpoint: 'sm',
  navOpen: false,
  navDocked: true,
  navWidth: 120,
  contentSelected: 'Minter',
  selectContent: () => {},
  setNavOpen: () => {},
  setNavDocked: () => {},

  // Settings
  networkSelected: { network: NETWORK.testnet },
  setNetwork: () => {},
  endpointSelected: ENDPOINTS[0],
  setEndpoint: () => {},
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RootProps {}

// eslint-disable-next-line react/prop-types
const Root: React.FC<RootProps> = ({ children }) => {
  const navBreakpoint = 'sm';

  const startingWidth = window.innerWidth;
  const navStartsOpen = startingWidth > BootrapBreakpoints[navBreakpoint];

  const [navAnimate, setNavAnimate] = useState(false);
  const [navOpen, setNavOpen] = useState(navStartsOpen);
  const [navDocked, setNavDocked] = useState(true);
  const [contentSelected, selectContent] = useState('Menu');

  const [networkSelected, setNetwork] = useState({ network: NETWORK.testnet });
  const [endpointSelected, setEndpoint] = useState(ENDPOINTS[0]);

  // Allow the sidebar to render without animated. By defualt, it
  // animates when it initially loads, making the page jump around with
  // every page load. This enables it to appear fully in instantly, but
  // then enables animations for menu interactions after the initial
  // load.
  useEffect(() => {
    const timer = setTimeout(() => {
      setNavAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Genereate desired Layout state here.
  const layout: AppState = {
    navAnimate,
    navBreakpoint: 'sm',
    navOpen,
    navDocked,
    navWidth: 120,
    contentSelected,
    selectContent,
    setNavOpen,
    setNavDocked,
    networkSelected,
    setNetwork,
    endpointSelected,
    setEndpoint,
  };

  return (
    <AppContext.Provider value={layout}>
      <Media
        query={{ minWidth: BootrapBreakpoints.sm }}
        onChange={(isLarge) => {
          setNavDocked(isLarge);
          setNavOpen(isLarge);
        }}
      />
      <div>{children}</div>
    </AppContext.Provider>
  );
};

export default Root;
