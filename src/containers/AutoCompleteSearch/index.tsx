import { connect } from 'react-redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { State } from '../../reducers';
import AutoCompleteSearch from '../../components/AutoCompleteSearch';
import { searchUpdate } from '../../actions';

interface OwnProps {
  stateKey: 'source' | 'destination';
  delay?: number;
  onChange: (query: string) => ThunkAction<void, State, null, null>;
  onSelect: (
    location: string,
    dispatch: ThunkDispatch<State, null, AnyAction>,
  ) => void | ThunkAction<void, State, null, null>;
}

const mapStateToProps = ({ search }: State, ownProps: OwnProps) => {
  return {
    value: search.query,
    items: search.suggestions,
    isLoading: search.isLoading,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<State, null, AnyAction>,
  ownProps: OwnProps,
) => {
  // for debouncing lookup requests
  let timer: any; // why any? https://stackoverflow.com/q/45802988

  const id = ownProps.stateKey;
  return {
    onChange(query: string) {
      dispatch(searchUpdate(query, id));
      if (query.length < 3) return;

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(ownProps.onChange(query));
        timer = null;
      }, ownProps.delay || 300);
    },
    onSelect(location: string) {
      dispatch(searchUpdate(location, id));
      ownProps.onSelect(location, dispatch);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AutoCompleteSearch);
