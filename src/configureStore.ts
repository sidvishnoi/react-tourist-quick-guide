import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';
import { State } from './state';

export default function configureStore(preloadedState: State) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, devToolsEnhancer({})];
  const composedEnhancers = compose(...enhancers) as StoreEnhancer<{}, {}>;

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  return store;
}
