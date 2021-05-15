import React, { useEffect, useState } from 'react';
import { FormGroup, Input } from 'reactstrap';
import { TagsInput } from './TagsInput/TagsInput';

const styles = {
  input: {
    marginTop: '5px',
    marginBottom: '5px',
  },
};

interface CreateWalletProps {
  seed: string[];
  maxTags: number;
  // eslint-disable-next-line react/no-unused-prop-types
  minTags: number;
  // eslint-disable-next-line react/require-default-props
  onChange?: (tags: string[]) => void;
}

// eslint-disable-next-line react/prop-types
const CreateWallet: React.FC<CreateWalletProps> = ({
  seed,
  maxTags,
  onChange,
}: CreateWalletProps) => {
  const [seedPhrase] = useState(seed || []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(seedPhrase);
  }, [seedPhrase]);

  // TODO: generate qr
  return (
    <div>
      <FormGroup>
        <Input style={styles.input} placeholder="wallet name" />
      </FormGroup>
      <TagsInput
        seedPhrase={seedPhrase}
        maxTags={maxTags}
        name="fruits"
        placeHolder=""
        disabled
      />
      <em>Generated mnemonic</em>
    </div>
  );
};

export default CreateWallet;
