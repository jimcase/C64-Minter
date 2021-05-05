import React, { useContext } from 'react';

import { Nav, Navbar, NavItem } from 'reactstrap';

import { LayoutContext } from '../Root/Root';

const Header: React.FC = () => {
  const ctx = useContext(LayoutContext);

  const { navOpen, setNavOpen, navDocked, navAnimate } = ctx;

  const icon = navOpen ? '⬅️' : '➡️';

  return (
    <Navbar color="light">
      <Nav>
        <NavItem
          id="navButton"
          className="mx-1"
          onClick={() => setNavOpen(!navOpen)}
          style={{ cursor: 'pointer' }}
        >
          {icon}
        </NavItem>
      </Nav>
      <Nav className="text-muted">
        <NavItem className="mx-1">NavOpen: {JSON.stringify(navOpen)}</NavItem>
        <NavItem className="mx-1">
          NavDocked: {JSON.stringify(navDocked)}
        </NavItem>
        <NavItem className="mx-1">
          NavAnimate: {JSON.stringify(navAnimate)}
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
