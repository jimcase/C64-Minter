import React, { useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import { LayoutContext } from '../Root/Root';

const styles = {
  nav: {
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
  },
};

const Nav: React.FC = () => {
  const ctx = useContext(LayoutContext);

  const { selectContent } = ctx;

  return (
    <div
      id="navBar"
      className="bg-light border-right"
      style={{ width: 'auto', height: '100%' }}
    >
      <div id="navBrand">C64</div>
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
            onClick={() => selectContent('About')}
          />
        </li>
      </ul>
    </div>
  );
};

export default Nav;
