import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GalleryProps {}

// eslint-disable-next-line react/prop-types
const Gallery: React.FC<GalleryProps> = () => {
  return (
    <div id="galleryView" style={{ height: '100%' }}>
      <div style={{ padding: '15px' }}>
        <h1 className="display-3">NFTs Gallery</h1>
        <h3>
          <strong>Total 872134423</strong>
        </h3>
        <hr className="my-2" />
      </div>
    </div>
  );
};

export default Gallery;
