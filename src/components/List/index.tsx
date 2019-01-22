import * as React from 'react';
import './List.css';

export interface ListProps {
  title: string;
  items: {
    name: string;
    link: string;
  }[];
  [prop: string]: any;
}

export default function Places(props: ListProps) {
  const { title, items, style } = props;
  return (
    <div className="List" style={style}>
      <h3>{title}</h3>
      <ul>
        {items.map((place, i) => (
          <li key={i}>
            <a href={place.link}>{place.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
