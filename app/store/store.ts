import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from '~/store/api/api';
import { authReducer } from '~/store/auth/auth.reducer';
import { userReducer } from '~/store/user/user.reducer';

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  user: userReducer.reducer,
  auth: authReducer.reducer
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
    .concat([api.middleware])
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
