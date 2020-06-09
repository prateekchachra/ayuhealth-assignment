import { createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';

const config = {
  key: 'AyuHealth',
  timeout: 0,
  storage: FilesystemStorage,
};

export default (storeConfig = (initialState, rootReducer) => {
  const persistedReducer = persistReducer(config, rootReducer);

  const store = createStore(
    persistedReducer,
    initialState
  );
  const persistor = persistStore(store);

  return {store, persistor};
});
