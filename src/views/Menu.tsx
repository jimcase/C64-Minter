import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MenuProps {}

// eslint-disable-next-line react/prop-types
const Menu: React.FC<MenuProps> = () => {
  return (
    <div id="menuView" style={{ height: '100%' }}>
      <div style={{ padding: '15px' }}>
        <h1 className="display-3">Menu</h1>
        <h3>
          <strong>Selector</strong>
        </h3>
        <hr className="my-2" />
        <h5>What to do?</h5>
      </div>
    </div>
  );
};

export default Menu;
