import React from 'react';
import { Row, Col } from 'reactstrap';

const styles = {
  menuOption: {
    textAlign: 'center',
  },
  menuButton: {
    width: '100%',
  },
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MenuProps {}

// eslint-disable-next-line react/prop-types
const Menu: React.FC<MenuProps> = () => {
  return (
    <div id="menuView" style={{ height: '100%' }}>
      <div style={{ padding: '15px' }}>
        <h1 className="display-3">Welcome</h1>
        <h3>
          <strong>Selector</strong>
        </h3>
        <hr className="my-2" />
        <Row>
          <Col>
            <div style={styles.menuOption}>
              {/* eslint-disable-next-line react/button-has-type */}
              <button style={styles.menuButton}>Gallery</button>
            </div>
          </Col>
          <Col>
            <div style={styles.menuOption}>
              {/* eslint-disable-next-line react/button-has-type */}
              <button style={styles.menuButton}>Mint NFTs</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={styles.menuOption}>
              {/* eslint-disable-next-line react/button-has-type */}
              <button style={styles.menuButton}>Wallet</button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Menu;
