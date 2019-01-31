import * as React from 'react';
import { connect } from 'react-redux';

import { addCity, getSuggestions, selectLocation } from '../../actions';
import { State } from '../../state';

import Text from '../../components/Text';
import AutoComplete from '../AutoComplete';
import Cities from '../Cities';

const mapStateToProps = (state: State) => ({
  source: state.source,
});

function App({ source }: { source: string }) {
  if (!source) {
    return (
      <div className="App">
        <Text as="h1" size="fsize_09">
          Where are you travelling from?
        </Text>
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
      <Text as="h1" size="fsize_09">
        Destinations from <em>{source}</em>:
      </Text>
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
