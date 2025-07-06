import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from '~/store/api/auth/auth.api';
import { EXPIRES } from '~/utils/constants';

export interface AuthState {
  expires?: Date;
  refreshing: boolean;
}

const getValidExpiresFromStorage = (): Date | undefined => {
  try {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const expires = localStorage.getItem(EXPIRES);

    if (!expires) {
      return undefined;
    }

    const exDate = new Date(Number(expires));

    if (exDate.getTime() < Date.now()) {
      localStorage.removeItem(EXPIRES);
      return undefined;
    }

    return exDate;
  } catch (error) {
    localStorage.removeItem(EXPIRES);
    return undefined;
  }
};

const initialState: AuthState = {
  expires: getValidExpiresFromStorage(),
  refreshing: false
};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        authApi.endpoints.refresh.matchPending,
        authApi.endpoints.login.matchPending
      ),
      (state) => {
        console.log('pending');
        state.refreshing = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        authApi.endpoints.refresh.matchFulfilled,
        authApi.endpoints.login.matchFulfilled
      ),
      (state, { payload }) => {
        const expires = new Date(Date.now() + payload.expires_in * 1000);
        state.expires = expires;
        state.refreshing = false;
        localStorage.setItem(EXPIRES, expires.getTime().toString());
      }
    );
    builder.addMatcher(
      isAnyOf(
        authApi.endpoints.logout.matchFulfilled,
        authApi.endpoints.refresh.matchRejected,
        authApi.endpoints.login.matchRejected
      ),
      (state) => {
        console.log('rejected');
        state.expires = undefined;
        state.refreshing = false;
        localStorage.removeItem(EXPIRES);
      }
    );
  }
});
