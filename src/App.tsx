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

import React from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css'; // TODO enable *.css from webpack conf
// import '../assets/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import icon from '../assets/icon.svg';
import './App.global.css';
// import WalletInfo from './WalletInfo';
import Root from './layout/Root/Root';
import NavWrapper from './layout/NavWrapper/NavWrapper';
import Header from './layout/Header/Header';
import Content from './layout/Content/Content';

const Main: React.FC = () => (
  <Root>
    <NavWrapper>
      <Header />
      <Content />
    </NavWrapper>
  </Root>
);

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}
