import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer, { setUser, removeUser } from './slice/userSlice';
import { firebaseApi } from '../store/slice/fireStoreApi';
import documentsReducer from '../store/slice/documentsSlice'
import goodsReducer from '../store/slice/goodsSlice'
import sortReducer from '../store/slice/sortSlice'
import mediaReducer from '../store/slice/mediaSlice'
import itemReducer from '../store/slice/itemSlice'
import basketReducer from '../store/slice/basketSlise';
import formReducer from './slice/formReducer';

const userToken = localStorage.getItem('userToken');
const userEmail = localStorage.getItem('userEmail');
const userId = localStorage.getItem('userId');

export const store = configureStore({
  reducer: {
    user: userReducer,
    documents: documentsReducer,
    goods: goodsReducer,
    sort: sortReducer,
    media: mediaReducer,
    item: itemReducer,
    basket: basketReducer,
    form: formReducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firebaseApi.middleware),
  preloadedState: {
    user: {
      email: userEmail || null,
      token: userToken || null,
      id: userId || null,
    },
  },
});

if (userToken) {
  store.dispatch(setUser({ email: userEmail || '', id: userId || '', token: userToken }));
} else {
  store.dispatch(removeUser());
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
