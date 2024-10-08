import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './auth';
import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './event';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  blacklist: [],
}

const reducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    })
})

export const persistor = persistStore(store)
export default store
