import * as React from 'react';
import * as ReactAutocomplete from 'react-autocomplete';
import styled from 'styled-components';

interface AutoCompleteSearchProps {
  // from mapDispatch:
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
  // from mapState:
  value: string;
  items: { name: string; id: string }[];
  isLoading: boolean;
  // ownProp:
  [prop: string]: any;
}

const AutoComplete = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: 100%;

  > div {
    position: relative;
  }

  input {
    padding: 1em;
    width: 100%;
    background: none;
    border: none;
    border: 1px solid #eee;
    background: #fff;
    border-radius: 3px;
    transition: all 0.2s ease;

    :focus {
      outline: none;
      border-radius: 0;
      border-color: cornflowerblue;
    }

    &.loading {
      opacity: 0.5;
    }
  }

  @media print {
    display: none;
  }
`;

const AutoCompleteMenu = styled.div`
  width: 100%;
  max-height: 300px;
  overflow: auto;
  border: 1px solid cornflowerblue;
  border-top: none;
  background: #fafafa;
  position: absolute;
  top: calc(2em + 2px);
  left: 0;
  border-radius: 0 0 3px 3px;

  :empty {
    display: none;
  }
`;

const AutoCompleteMenuItem = styled.div`
  padding: 0.5em 1em;
  background: ${(props: { active: boolean }) =>
    props.active ? '#eee' : '#fff'};
  :hover {
    cursor: pointer;
  }
`;

export default function AutoCompleteSearch(props: AutoCompleteSearchProps) {
  const {
    onChange,
    onSelect,
    items,
    value,
    isLoading,
    placeholder,
    id,
  } = props;

  return (
    <AutoComplete>
      <ReactAutocomplete
        items={items}
        getItemValue={item => item.name}
        inputProps={{
          className: isLoading ? 'loading' : '',
          id,
          placeholder: placeholder || 'Enter location',
        }}
        value={value}
        onChange={(e, val) => {
          e.persist();
          onChange(val);
        }}
        onSelect={onSelect}
        renderMenu={children => (
          <AutoCompleteMenu role="listbox">{children}</AutoCompleteMenu>
        )}
        renderItem={(item, isHighlighted) => {
          return (
            <AutoCompleteMenuItem
              role="option"
              active={isHighlighted}
              aria-selected={isHighlighted}
              key={item.id}
            >
              {item.name}
            </AutoCompleteMenuItem>
          );
        }}
      />
    </AutoComplete>
  );
}
