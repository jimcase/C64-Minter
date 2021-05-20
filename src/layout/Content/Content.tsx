import React, { useContext } from 'react';
import { Alert } from 'reactstrap';
import * as FaIcons from 'react-icons/fa';
import { LayoutContext } from '../Root/Root';
import Minter from '../../views/Minter';
import Wallet from '../../views/Wallet';
import Gallery from '../../views/Gallery';
import Settings from '../../views/Settings';

const Content: React.FC = () => {
  const ctx = useContext(LayoutContext);

  const { contentSelected } = ctx; // TODO: set var when

  let component;
  switch (contentSelected) {
    case 'Minter':
      component = <Minter />;
      break;
    case 'Gallery':
      component = <Gallery />;
      break;
    case 'About':
      component = <Settings />;
      break;
    default:
      component = <Wallet />;
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
        With{' '}
        <span>
          <FaIcons.FaHeart />
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
      </Alert>
    </div>
  );
};

export default Content;
