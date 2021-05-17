import React, { useContext } from 'react';
import { LayoutContext } from '../Root/Root';
import Minter from '../../views/Minter';
import Wallet from '../../views/Wallet';

const Content: React.FC = () => {
  const ctx = useContext(LayoutContext);

  const { contentSelected } = ctx; // TODO: set var when

  let component;
  switch (contentSelected) {
    case 'Minter':
      component = <Minter />;
      break;
    case 'Gallery':
      component = <p>Gallery content</p>;
      break;
    case 'About':
      component = <p>About content</p>;
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
    </div>
  );
};

export default Content;
