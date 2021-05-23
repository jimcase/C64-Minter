import React, { useContext } from 'react';
import { Row, Col } from 'reactstrap';
import { AppContext } from '../layout/Root/Root';

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
  const ctx = useContext(AppContext);

  const { selectContent } = ctx;

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
              <button
                style={styles.menuButton}
                onClick={() => selectContent('Gallery')}
              >
                Gallery
              </button>
            </div>
          </Col>
          <Col>
            <div style={styles.menuOption}>
              {/* eslint-disable-next-line react/button-has-type */}
              <button
                style={styles.menuButton}
                onClick={() => selectContent('Minter')}
              >
                Mint NFTs
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={styles.menuOption}>
              {/* eslint-disable-next-line react/button-has-type */}
              <button
                style={styles.menuButton}
                onClick={() => selectContent('Wallet')}
              >
                Wallet
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Menu;
