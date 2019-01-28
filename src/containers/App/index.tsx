import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { addCity, getSuggestions, selectLocation } from '../../actions';
import { State } from '../../state';

import AutoCompleteSearch from '../AutoCompleteSearch';
import Cities from '../Cities';

const mapStateToProps = (state: State) => ({
  source: state.source,
});

const Heading = styled.h2`
  padding: 1em 1em 0;
  text-align: center;
`;

function App({ source }: { source: string }) {
  if (!source) {
    return (
      <div className="App">
        <Heading>Where are you travelling from?</Heading>
        <AutoCompleteSearch
          placeholder="Your Location"
          onChange={getSuggestions}
          onSelect={selectLocation}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <Heading>
        Destinations from <em>{source}</em>:
      </Heading>
      <AutoCompleteSearch
        placeholder="Add destination"
        onChange={getSuggestions}
        onSelect={addCity}
      />
      <div className="Content">
        <Cities />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
