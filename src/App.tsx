import * as React from 'react';
import { getSuggestions, selectLocation } from './actions';
import AutoCompleteSearch from './containers/AutoCompleteSearch';
import './App.css';
import Cities from './containers/Cities';
import { State } from './reducers';
import { connect } from 'react-redux';

const mapStateToProps = ({ source }: State) => ({
  source,
});

function App({ source }: { source: string }) {
  if (!source) {
    return (
      <div className="App">
        <div className="Search">
          <AutoCompleteSearch
            stateKey="source"
            placeholder="Your Location"
            onChange={getSuggestions('source')}
            onSelect={selectLocation('source')}
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
          stateKey="destination"
          placeholder="Add destination"
          onChange={getSuggestions('destination')}
          onSelect={selectLocation('destination')}
        />
      </div>
      <div className="Content">
        <Cities />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
