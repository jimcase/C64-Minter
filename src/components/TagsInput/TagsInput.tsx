import { css, setup } from 'goober';
import React, { useEffect, useState } from 'react';
import validWords from '../../utils/valid-words';
import cc from './classnames';
import Tag from './Tag';

export interface TagsInputProps {
  name?: string;
  placeHolder?: string;
  value?: {
    text: string;
    textId: string;
  }[];
  maxTags: number;
  disabled?: boolean;
  onChange?: (tags: { text: string; textId: string }[]) => void;
  onBlur?: any;
  separators?: string[];
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
  maxTags,
  onChange,
  onBlur,
  separators,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(tags);
  }, [tags]);

  const regexValidation = '^[a-z]+$';

  const ValidWord = (word: string) => {
    return validWords.includes(word);
  };

  const ValidText = (txt: string, rgx: string) => {
    const regex = new RegExp(rgx);
    return regex.test(txt);
  };

  const handleOnKeyUp = (e) => {
    e.stopPropagation();

    const text = e.target.value;

    if (e.key === 'Backspace' && tags.length && !text) {
      setTags(tags.slice(0, -1));
    }
    if (
      tags.length < maxTags &&
      text &&
      ValidText(text, regexValidation) &&
      ValidWord(text) &&
      (separators || defaultSeprators).includes(e.key)
    ) {
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
          validText={ValidText(tag.text, regexValidation)}
          validWord={ValidWord(tag.text)}
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
