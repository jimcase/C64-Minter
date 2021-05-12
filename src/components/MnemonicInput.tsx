import React, { useState } from 'react';
import { TagsInput } from './TagsInput2/TagsInput';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MnemonicInputProps {}

// eslint-disable-next-line react/prop-types
const MnemonicInput: React.FC<MnemonicInputProps> = ({ parentCallback }) => {
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

  const disebldIputTags = false;

  let placeholder = '';
  if (!disebldIputTags) {
    placeholder = `enter mnemonic (${selected.length})`;
  }
  return (
    <div>
      <h1>Add words {selected.length}</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <TagsInput
        value={selected}
        onChange={() => {
          setSelected(selected);
          parentCallback(selected);
        }}
        onExisting={() => setSelected(selected)}
        name="fruits"
        placeHolder={placeholder}
        disabled={disebldIputTags}
      />
      {!disebldIputTags ? <em>press enter to add new tag</em> : null}
    </div>
  );
};

export default MnemonicInput;
