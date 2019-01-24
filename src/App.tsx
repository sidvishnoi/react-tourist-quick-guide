import * as React from 'react';
import { connect } from 'react-redux';

import { addCity, getSuggestions, selectLocation } from './actions';
import './App.css';
import AutoCompleteSearch from './containers/AutoCompleteSearch';
import Cities from './containers/Cities';
import { State } from './state';

const mapStateToProps = ({ source }: State) => ({
  source,
});

function App({ source }: { source: string }) {
  if (!source) {
    return (
      <div className="App">
        <div className="Search">
          <AutoCompleteSearch
            placeholder="Your Location"
            onChange={getSuggestions}
            onSelect={selectLocation}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h2 className="source">
        Destinations from <em>{source}</em>:
      </h2>
      <div className="Search">
        <AutoCompleteSearch
          placeholder="Add destination"
          onChange={getSuggestions}
          onSelect={addCity}
        />
      </div>
      <div className="Content">
        <Cities />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
