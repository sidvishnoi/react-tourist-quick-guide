import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { searchUpdate } from '../../actions';
import AutoCompleteSearch from '../../components/AutoCompleteSearch';
import { State } from '../../state';

interface OwnProps {
  delay?: number;
  onChange: (query: string) => ThunkAction<void, State, null, null>;
  onSelect: (location: string) => ThunkAction<void, State, null, null>;
}

const mapStateToProps = ({ search }: State) => {
  return {
    isLoading: search.isLoading,
    items: search.suggestions,
    value: search.query,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<State, null, AnyAction>,
  ownProps: OwnProps,
) => {
  // for debouncing lookup requests
  let timer: any; // why any? https://stackoverflow.com/q/45802988

  return {
    onChange(query: string) {
      dispatch(searchUpdate(query));
      if (query.length < 3) {
        return;
      }

      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        dispatch(ownProps.onChange(query));
        timer = null;
      }, ownProps.delay || 300);
    },
    onSelect(location: string) {
      dispatch(ownProps.onSelect(location));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AutoCompleteSearch);
