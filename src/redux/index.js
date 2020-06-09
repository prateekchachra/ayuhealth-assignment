import {combineReducers} from 'redux';
import storeConfig from './storeConfig';
const rootReducer = combineReducers({
  main: require('./reducer').reducer,
});

export const {store, persistor} = storeConfig({}, rootReducer);
