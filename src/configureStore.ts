import { createStore, applyMiddleware, compose, StoreEnhancer } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './reducers';

export default function configureStore(preloadedState?: any) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, devToolsEnhancer({})];
  const composedEnhancers = compose(...enhancers) as StoreEnhancer<{}, {}>;

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  return store;
}
