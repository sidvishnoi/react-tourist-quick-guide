import { connect } from 'react-redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { State } from '../../reducers';
import AutoCompleteSearch from '../../components/AutoCompleteSearch';

interface OwnProps {
  id: string;
  delay?: number;
  onChange: (query: string) => ThunkAction<void, State, null, null>;
  onSelect: (
    location: string,
    dispatch: ThunkDispatch<State, null, AnyAction>,
  ) => void | ThunkAction<void, State, null, null>;
}

const mapStateToProps = ({ search }: State) => ({
  value: search.query,
  items: search.suggestions,
  isLoading: search.isLoading,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<State, null, AnyAction>,
  ownProps: OwnProps,
) => {
  // for debouncing lookup requests
  let timer: any; // https://stackoverflow.com/q/45802988

  return {
    onChange(query: string) {
      dispatch({ type: 'SUGGESTION_NOOP', query });
      if (query.length < 3) return;

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(ownProps.onChange(query));
        timer = null;
      }, ownProps.delay || 300);
    },
    onSelect(location: string) {
      dispatch({ type: 'SUGGESTION_NOOP', query: location });
      ownProps.onSelect(location, dispatch);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AutoCompleteSearch);
