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
          id="search-list"
          onChange={getSuggestions}
          onSelect={selectLocation}
        />
      </div>
      <div className="Content">
        <Cities />
      </div>
    </div>
  );
}

export default App;
