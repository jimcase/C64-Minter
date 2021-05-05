import React, { useContext } from 'react';

import Sidebar from 'react-sidebar';

import Nav from '../Nav/Nav';
import { LayoutContext } from '../Root/Root';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NavWrapperProps {}

// eslint-disable-next-line react/prop-types
const NavWrapper: React.FC<NavWrapperProps> = ({ children }) => {
  const ctx = useContext(LayoutContext);

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
