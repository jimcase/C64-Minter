import React, { useContext } from 'react';

import { Nav, Navbar, NavItem } from 'reactstrap';

import * as FaIcons from 'react-icons/fa';
import { AppContext } from '../Root/Root';

const styles = {
  arrow: {
    margin: '3px',
    fontSize: '30px',
  },
};

const Header: React.FC = () => {
  const ctx = useContext(AppContext);

  const { navOpen, setNavOpen, navDocked, navAnimate } = ctx;

  const icon = navOpen ? (
    <FaIcons.FaArrowCircleLeft style={styles.arrow} />
  ) : (
    <FaIcons.FaArrowCircleRight style={styles.arrow} />
  );

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
