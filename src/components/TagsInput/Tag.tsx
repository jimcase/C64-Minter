import React from 'react';
import { css } from 'goober';
import cc from './classnames';
import validWords from '../../utils/valid-words';

interface TagProps {
  text: string;
  textId: string;
  remove: any;
  blocked?: boolean;
  validation: string;
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

const ValidText = (text: string, rgx: string) => {
  const regex = new RegExp(rgx);
  return regex.test(text);
};

const ValidWord = (word: string) => {
  return validWords.includes(word);
};

export default function Tag({
  text,
  textId,
  remove,
  blocked,
  validation,
}: TagProps) {
  const handleOnRemove = (e) => {
    e.stopPropagation();
    remove(textId);
  };
  let validatedTag = '';
  if (!ValidText(text, validation) || !ValidWord(text)) {
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
