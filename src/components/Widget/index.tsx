import * as React from 'react';

interface Props {
  state: string;
  children: any;
}

export default function({ state, children }: Props) {
  if (state === 'loading') {
    return <div className="widget">...</div>;
  }
  return <div className="widget">{children}</div>;
}
