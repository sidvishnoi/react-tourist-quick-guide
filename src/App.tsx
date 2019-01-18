import * as React from 'react';
import AutoCompleteSearch from './containers/search';
import { getSuggestions } from './actions';

function App() {
  return (
    <div className="App">
      <AutoCompleteSearch
        suggestor={getSuggestions}
        name="search-list"
        onSelect={(term, dispatch) => {
          dispatch({ type: 'LOCATION_SELECT', term });
        }}
      />
    </div>
  );
}

export default App;
