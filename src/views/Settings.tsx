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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SettingsProps {}

// eslint-disable-next-line react/prop-types
const Settings: React.FC<SettingsProps> = () => {
  return (
    <div id="galleryView" style={{ height: '100%' }}>
      <div style={{ padding: '15px' }}>
        <h1 className="display-3">Settings</h1>
        <h3>
          <strong>Change app settings</strong>
        </h3>
        <hr className="my-2" />
        <h5>Select Endpoints</h5>
      </div>
    </div>
  );
};

export default Settings;
