import React, { useEffect, useState } from 'react';
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
  maxTags: number;
  // eslint-disable-next-line react/no-unused-prop-types
  minTags: number;
  // eslint-disable-next-line react/require-default-props
  onChange?: (tags: { text: string; textId: string }[]) => void;
}

// eslint-disable-next-line react/prop-types
const RestoreWallet: React.FC<RestoreWalletProps> = ({
  tags,
  maxTags,
  onChange,
}: RestoreWalletProps) => {
  const [selected, setSelected] = useState(tags || []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(selected);
  }, [selected]);

  return (
    <div>
      <FormGroup>
        <Input style={styles.input} placeholder="wallet name" />
      </FormGroup>
      <TagsInput
        value={selected}
        maxTags={maxTags}
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
    </div>
  );
};

export default RestoreWallet;
