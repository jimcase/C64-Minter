import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SettingsProps {}

// eslint-disable-next-line react/prop-types
const Settings: React.FC<SettingsProps> = () => {
  return (
    <div id="galleryView" style={{ height: '100%' }}>
      <div style={{ padding: '15px' }}>
        <h1 className="display-3">Settings</h1>
        <h3>
          <strong>Change app settings</strong>
        </h3>
        <hr className="my-2" />
        <h5>Select Endpoints</h5>
      </div>
    </div>
  );
};

export default Settings;
