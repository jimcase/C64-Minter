import React, { useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import { AppContext } from '../Root/Root';

const styles = {
  nav: {
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
  },
};

const Nav: React.FC = () => {
  const ctx = useContext(AppContext);

  const { selectContent } = ctx;

  return (
    <div
      id="navBar"
      className="bg-light border-right"
      style={{ width: 'auto', height: '100%' }}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div id="navBrand" onClick={() => selectContent('Menu')}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">C64</a>
      </div>
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
