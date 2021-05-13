import React, { useState } from 'react';
import { FormGroup, Input } from 'reactstrap';
import { TagsInput } from './TagsInput/TagsInput';

const styles = {
  input: {
    marginTop: '5px',
    marginBottom: '5px',
  },
};

interface RestoreWalletProps {
  // eslint-disable-next-line react/require-default-props
  tags?: {
    text: string;
    textId: string;
  }[];
}

// eslint-disable-next-line react/prop-types
const RestoreWallet: React.FC<RestoreWalletProps> = ({
  tags,
}: RestoreWalletProps) => {
  const [selected, setSelected] = useState(tags || []);

  return (
    <div>
      <FormGroup>
        <Input style={styles.input} placeholder="wallet name" />
      </FormGroup>
      <TagsInput
        value={selected}
        onChange={(tgs) => {
          setSelected(tgs);
          // parentCallback(selected);
        }}
        onExisting={() => setSelected(selected)}
        name="fruits"
        placeHolder="enter mnemonic"
        disabled={false}
      />
      <em>press enter to add new tag</em>
      <pre>{JSON.stringify(selected)}</pre>
    </div>
  );
};

export default RestoreWallet;
