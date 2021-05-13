import React, { useState } from 'react';
import { FormGroup, Input } from 'reactstrap';
import { TagsInput } from './TagsInput/TagsInput';

const styles = {
  input: {
    marginTop: '5px',
    marginBottom: '5px',
  },
};

interface CreateWalletProps {
  // eslint-disable-next-line react/require-default-props
  tags?: {
    text: string;
    textId: string;
  }[];
}

// eslint-disable-next-line react/prop-types
const CreateWallet: React.FC<CreateWalletProps> = ({
  tags,
}: CreateWalletProps) => {
  const [selected, setSelected] = useState(tags || []);

  // TODO: generate qr
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
        placeHolder=""
        disabled
      />
      <em>Generated mnomenic</em>
      <pre>{JSON.stringify(selected)}</pre>
    </div>
  );
};

export default CreateWallet;
