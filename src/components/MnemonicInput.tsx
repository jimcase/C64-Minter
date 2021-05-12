import React, { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

const MnemonicInput: React.FC = () => {
  const [selected, setSelected] = useState([
    'pelican',
    'void',
    'shop',
    'left',
    'ice',
    'glimpse',
    'cream',
    'dish',
    'tongue',
    'slice',
    'join',
    'supply',
    'spoon',
    'alone',
    'eyebrow',
  ]);

  return (
    <div>
      <h1>Add words</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="fruits"
        placeHolder="enter mnemonic"
      />
      <em>press enter to add new tag</em>
    </div>
  );
};

export default MnemonicInput;
