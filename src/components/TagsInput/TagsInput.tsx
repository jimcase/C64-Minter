import { css, setup } from 'goober';
import React, { useEffect, useState } from 'react';

import cc from './classnames';
import Tag from './Tag';

export interface TagsInputProps {
  name?: string;
  placeHolder?: string;
  value?: {
    text: string;
    textId: string;
  }[];
  disabled?: boolean;
  onChange?: (tags: { text: string; textId: string }[]) => void;
  onBlur?: any;
  seprators?: string[];
  onExisting?: (tag: string) => void;
  onRemoved?: (tag: string) => void;
}

// initialize goober once
setup(React.createElement);

const RTIContainer = css({
  '--rtiBg': '#fff',
  '--rtiBorder': '#ccc',
  '--rtiMain': '#3182ce',
  '--rtiRadius': '0.375rem',
  '--rtiS': '0.5rem',
  '--rtiTag': '#edf2f7',
  '--rtiTagRemove': '#e53e3e',

  '*': {
    boxSizing: 'border-box',
    transition: 'all 0.2s ease',
  },

  alignItems: 'center',
  bg: 'var(--rti-bg)',
  border: '1px solid var(--rti-border)',
  borderRadius: 'var(--rti-radius)',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--rti-s)',
  lineHeight: 1.4,
  padding: 'var(--rti-s)',

  '&:focus-within': {
    borderColor: 'var(--rti-main)',
    boxShadow: 'var(--rti-main) 0px 0px 0px 1px',
  },
});

const RTIInput = css({
  border: 0,
  outline: 0,
  fontSize: 'inherit',
  lineHeight: 'inherit',
  width: '50%',
});

const defaultSeprators = ['Enter', ',', ' '];

export const TagsInput = ({
  name,
  placeHolder,
  value,
  onChange,
  onBlur,
  seprators,
  disabled,
  onRemoved,
}: TagsInputProps) => {
  const [counter, incrementCounter] = useState(0);
  const [tags, setTags] = useState(
    value || [
      {
        text: '',
        textId: '',
      },
    ]
  );

  useEffect(() => {
    // TODO: for (var key in dictionary){
    // key will be -> 'id'
    // dictionary[key] -> 'value'
    // }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(tags);
  }, [tags]);

  const handleOnKeyUp = (e) => {
    e.stopPropagation();

    const text = e.target.value;

    if (e.key === 'Backspace' && tags.length && !text) {
      setTags(tags.slice(0, -1));
    }

    if (text && (seprators || defaultSeprators).includes(e.key)) {
      setTags([...tags, { text, textId: `${text}`.concat(String(counter)) }]);
      incrementCounter(counter + 1);
      e.target.value = '';
      e.preventDefault();
    }
  };

  const onTagRemove = (textId) => {
    setTags(tags.filter((tag) => tag.textId !== textId));
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onRemoved && onRemoved(textId);
  };

  /*
   *   TODO: validate word with regex, max words.
   * */
  return (
    <div aria-labelledby={name} className={cc('rti--container', RTIContainer)}>
      {tags.map((tag) => (
        <Tag
          key={tag.textId}
          text={tag.text}
          textId={tag.text}
          remove={() => onTagRemove(tag.textId)}
          blocked={disabled}
        />
      ))}

      <input
        className={cc('rti--input', RTIInput)}
        type="text"
        name={name}
        placeholder={placeHolder}
        onKeyDown={handleOnKeyUp}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  );
};
