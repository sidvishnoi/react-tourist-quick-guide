import * as React from 'react';
import * as AutoComplete from 'react-autocomplete';
import './AutoCompleteSearch.css';

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

  const classNames = ['AutoComplete-input'];
  if (isLoading) {
    classNames.push('AutoComplete-input--loading');
  }

  return (
    <div className="AutoComplete">
      <AutoComplete
        items={items}
        getItemValue={item => item.name}
        inputProps={{
          className: classNames.join(' '),
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
          <div className="AutoComplete-menu">{children}</div>
        )}
        renderItem={(item, isHighlighted) => (
          <div
            key={item.id}
            className={`AutoComplete-menuItem ${
              isHighlighted ? 'AutoComplete-menuItem--highlighted' : ''
            }`}
          >
            {item.name}
          </div>
        )}
      />
    </div>
  );
}
