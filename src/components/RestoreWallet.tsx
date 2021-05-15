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
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  seed?: string[];
  maxTags: number;
  // eslint-disable-next-line react/no-unused-prop-types
  minTags: number;
  // eslint-disable-next-line react/require-default-props
  onChange?: (seed: string[]) => void;
}

// eslint-disable-next-line react/prop-types
const RestoreWallet: React.FC<RestoreWalletProps> = ({
  seed,
  maxTags,
  onChange,
}: RestoreWalletProps) => {
  const [seedPhrase, setSeedPhrase] = useState(seed || []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(seedPhrase);
  }, [onChange, seedPhrase]);

  return (
    <div>
      <FormGroup>
        <Input style={styles.input} placeholder="wallet name" />
      </FormGroup>
      <TagsInput
        seedPhrase={seedPhrase}
        maxTags={maxTags}
        onChange={(tgs) => {
          const s: string[] = [];
          tgs.forEach(function (wordObject: { text: string; textId: string }) {
            s.push(wordObject.text);
          });
          setSeedPhrase(s);
        }}
        name="fruits"
        placeHolder="enter mnemonic"
        disabled={false}
      />
      <em>press enter to add new tag</em>
    </div>
  );
};

export default RestoreWallet;
