import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';
// import thunk from 'redux-thunk';



// const persistConfig = {
//   key: 'root',
//   storage,
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: rootReducer,
  // middleware: [thunk],
})