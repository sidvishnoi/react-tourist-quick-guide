import * as React from 'react';

interface InputProps {
  name: string;
  onInput: (e: React.FormEvent<HTMLInputElement>) => void;
}

interface DatalistProps {
  name: string;
  items: string[];
  term: string;
  isLoading: boolean;
}

type SearchProps = InputProps & DatalistProps & {
  isInvalid: boolean
};

export default function Search({
  onInput,
  items,
  term,
  isLoading,
  name,
}: SearchProps) {
  const isInvalid = term.length && !items.length;
  return (
    <div className={"Search" + (isInvalid ? " invalid" : "") }>
      <Input name={name} onInput={onInput} />
      <SearchSuggestions
        items={items}
        term={term}
        isLoading={isLoading}
        name={name}
      />
    </div>
  );
}

function Input({
  name,
  onInput,
}: InputProps) {
  return (
    <input
      onInput={onInput}
      list={name}
      id={'input-' + name}
      className="Input"
      type="text"
      placeholder="Search..."
      autoComplete="off"
    />
  );
}

function SearchSuggestions({ items, isLoading, name }: DatalistProps) {
  if (isLoading) return <>...</>;
  if (!items.length) return <></>;

  return (
    <datalist className="SearchSuggestions" id={name}>
      {items.map((item, i) => (
        <option key={i} value={item}>
          {item}
        </option>
      ))}
    </datalist>
  );
}
