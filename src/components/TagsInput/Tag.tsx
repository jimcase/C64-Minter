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

import React from 'react';
import { css } from 'goober';
import cc from './classnames';

interface TagProps {
  text: string;
  textId: string;
  remove: any;
  blocked?: boolean;
  validText: boolean;
  validWord: boolean;
}

const tagStyles = css({
  alignItems: 'center',
  background: 'var(--rti-tag)',
  borderRadius: 'var(--rti-radius)',
  display: 'inline-flex',
  justifyContent: 'center',
  paddingLeft: 'var(--rti-s)',

  button: {
    background: 'none',
    border: 0,
    borderRadius: '50%',
    cursor: 'pointer',
    lineHeight: 'inherit',
    padding: '0 var(--rti-s)',

    '&:hover': {
      color: 'var(--rti-tag-remove)',
    },
  },
});
const validationStyles = css({
  color: 'red',
});

export default function Tag({
  text,
  textId,
  remove,
  blocked,
  validText,
  validWord,
}: TagProps) {
  const handleOnRemove = (e) => {
    e.stopPropagation();
    remove(textId);
  };
  let validatedTag = '';
  if (!validText || !validWord) {
    validatedTag = cc('rti--tag', validationStyles);
  }
  return (
    <span className={cc('rti--tag', tagStyles)}>
      <span className={validatedTag}>{text}</span>
      {!blocked ? (
        <button
          type="button"
          onClick={handleOnRemove}
          aria-label={`remove ${text}`}
        >
          &#10005;
        </button>
      ) : null}
    </span>
  );
}

Tag.defaultProps = {
  blocked: false,
};
