import * as React from 'react';
import { getSuggestions, selectLocation } from './actions';
import AutoCompleteSearch from './containers/AutoCompleteSearch';
import './App.css';
import Cities from './containers/Cities';

function App() {
  return (
    <div className="App">
      <div className="Search">
        <AutoCompleteSearch
          id="search-list-source"
          stateKey="source"
          placeholder="Your Location"
          onChange={getSuggestions('source')}
          onSelect={selectLocation('source')}
        />
        <AutoCompleteSearch
          id="search-list-destination"
          stateKey="destination"
          placeholder="Destination"
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

export default App;
