/*
  Copyright (c) 2021, C64 <c64@gmail.com>. All rights reserved.

  Licensed to the Apache Software Foundation (ASF) under one
  or more contributor license agreements.  See the NOTICE file
  distributed with this work for additional information
  regarding copyright ownership.  The ASF licenses this file
  to you under the Apache License, Version 2.0 (the
  "License"); you may not use this file except in compliance
  with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing,
  software distributed under the License is distributed on an
  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, either express or implied.  See the License for the
  specific language governing permissions and limitations
  under the License.
*/

import React, { ChangeEvent, useEffect, useState } from 'react';
import { FormGroup, FormText, Input, Row, Col } from 'reactstrap';
import { TagsInput } from '../TagsInput/TagsInput';
import { generateMnemonicSeed } from '../../lib/WalletLib';

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
  // eslint-disable-next-line react/require-default-props
  onChangeSpendingPassword?: (pass: string) => void;
}

// eslint-disable-next-line react/prop-types
const CreateWallet: React.FC<CreateWalletProps> = ({
  seed,
  maxTags,
  onChange,
  onChangeName,
  onChangeSpendingPassword,
}: CreateWalletProps) => {
  const generatedSeed = generateMnemonicSeed(160);
  const [seedPhrase] = useState(seed || generatedSeed);
  const [spendingPassword, setSpendingPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(seedPhrase);
  }, [onChange, seedPhrase]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChangeName && onChangeName(name);
  }, [onChangeName, name]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChangeSpendingPassword && onChangeSpendingPassword(spendingPassword);
  }, [onChangeSpendingPassword, spendingPassword]);

  const HandleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const HandleSpendingPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setSpendingPassword(e.target.value);
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
      <FormGroup>
        <Row>
          <FormText>
            The password will not be stored in-app, you have to remember it.
          </FormText>
          <Col sm="6">
            <Input
              style={styles.input}
              type="password"
              placeholder="spending password"
              onChange={(e) => HandleSpendingPassword(e)}
            />
          </Col>
          <Col sm="6">
            <Input
              style={styles.input}
              type="password"
              placeholder="repeat spending password"
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <FormText>
          Recovery phrase that secures your funds forever,{' '}
          <strong>must be stored Offline</strong>.
        </FormText>
        <TagsInput
          seedPhrase={seedPhrase}
          maxTags={maxTags}
          name="fruits"
          placeHolder=""
          disabled
        />
        <FormText>Generated mnemonic ({seedPhrase.length})</FormText>
      </FormGroup>
    </div>
  );
};

export default CreateWallet;
