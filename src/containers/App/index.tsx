import * as React from 'react';
import { connect } from 'react-redux';

import { addCity, getSuggestions, selectLocation } from '../../actions';
import { State } from '../../state';

import H1 from '../../components/H1';
import AutoComplete from '../AutoComplete';
import Cities from '../Cities';

const mapStateToProps = (state: State) => ({
  source: state.source,
});

function App({ source }: { source: string }) {
  if (!source) {
    return (
      <div className="App">
        <H1>Where are you travelling from?</H1>
        <AutoComplete
          placeholder="Your Location"
          onChange={getSuggestions}
          onSelect={selectLocation}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <H1>
        Destinations from <em>{source}</em>:
      </H1>
      <AutoComplete
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
