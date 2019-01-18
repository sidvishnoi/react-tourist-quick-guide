import * as React from 'react';
import { connect } from 'react-redux';
import Search from '../../components/search';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { debounce } from '../../utils';
import { State } from '../../reducers';

interface OwnProps {
  name: string;
  suggestor: (term: string) => ThunkAction<void, State, null, null>;
  onSelect: (
    term: string,
    dispatch: ThunkDispatch<State, null, AnyAction>,
  ) => void | ThunkAction<void, State, null, null>;
}

const mapStateToProps = ({ search }: State) => ({
  term: search.term,
  items: search.suggestions,
  isLoading: search.isLoading,
  isInvalid: search.term.length && !search.suggestions.length
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<State, null, AnyAction>,
  ownProps: OwnProps,
) => {
  const onInputChange = (term: string) => {
    if (term.length < 3) {
      return dispatch({ type: 'SUGGESTION_NOOP' });
    }
    dispatch(ownProps.suggestor(term));
  };
  const onInputChangeDebounced = debounce(onInputChange, 300);

  return {
    onInput(event: React.ChangeEvent<HTMLInputElement>) {
      event.persist();
      const term = event.target.value;

      const dataList = document.getElementById(ownProps.name);
      if (!dataList) {
        return onInputChangeDebounced(term);
      }
      
      const options = Array.from(dataList.querySelectorAll('option'));
      const isInList = !!options.find(option => option.value === term);
      
      if (isInList) {
        if (typeof ownProps.onSelect === 'function') {
          ownProps.onSelect(term, dispatch);
        }
      } else {
        onInputChangeDebounced(term);
      }
    },
  };
};

const AutoCompleteSearch = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);

export default AutoCompleteSearch;
