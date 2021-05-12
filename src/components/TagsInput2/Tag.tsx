import React from 'react';
import { css } from 'goober';
import cc from './classnames';

interface TagProps {
  text: string;
  textId: string;
  remove: any;
  blocked?: boolean;
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

export default function Tag({ text, textId, remove, blocked }: TagProps) {
  const handleOnRemove = (e) => {
    e.stopPropagation();
    remove(textId);
  };

  return (
    <span className={cc('rti--tag', tagStyles)}>
      <span>{text}</span>
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
