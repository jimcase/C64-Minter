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

/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import * as FaIcons from 'react-icons/fa';
import QRCode from 'qrcode.react';

const QrCodeAddress = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const { value } = props;
  // console.log(value);
  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/control-has-associated-label */}
      <a
        id={`QrCode-${value}`}
        href="#"
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <FaIcons.FaQrcode />
      </a>
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        autohide={false}
        target={`QrCode-${value}`}
        toggle={toggle}
      >
        <QRCode
          value={value}
          bgColor="#FFFFFF"
          fgColor="#000000"
          includeMargin
        />
      </Tooltip>
    </div>
  );
};

export default QrCodeAddress;
