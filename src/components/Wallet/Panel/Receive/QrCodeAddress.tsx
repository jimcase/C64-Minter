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
