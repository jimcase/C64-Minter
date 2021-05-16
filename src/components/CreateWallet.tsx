import React, { ChangeEvent, useEffect, useState } from 'react';
import { FormGroup, Input } from 'reactstrap';
import { TagsInput } from './TagsInput/TagsInput';
import { generateMnemonicSeed } from '../lib/WalletLib';

const styles = {
  input: {
    marginTop: '5px',
    marginBottom: '5px',
  },
};

interface CreateWalletProps {
  // eslint-disable-next-line react/require-default-props
  seed?: string[];
  maxTags: number;
  // eslint-disable-next-line react/no-unused-prop-types
  minTags: number;
  // eslint-disable-next-line react/require-default-props
  onChange?: (tags: string[]) => void;
  // eslint-disable-next-line react/require-default-props
  onChangeName?: (name: string) => void;
}

// eslint-disable-next-line react/prop-types
const CreateWallet: React.FC<CreateWalletProps> = ({
  seed,
  maxTags,
  onChange,
  onChangeName,
}: CreateWalletProps) => {
  const generatedSeed = generateMnemonicSeed(160);
  const [seedPhrase] = useState(seed || generatedSeed);
  const [name, setName] = useState('');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(seedPhrase);
  }, [onChange, seedPhrase]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChangeName && onChangeName(name);
  }, [onChangeName, name]);

  const HandleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <div>
      <FormGroup>
        <Input
          style={styles.input}
          placeholder="wallet name"
          onChange={(e) => HandleInputName(e)}
        />
      </FormGroup>
      <TagsInput
        seedPhrase={seedPhrase}
        maxTags={maxTags}
        name="fruits"
        placeHolder=""
        disabled
      />
      <em>Generated mnemonic ({seedPhrase.length})</em>
    </div>
  );
};

export default CreateWallet;
