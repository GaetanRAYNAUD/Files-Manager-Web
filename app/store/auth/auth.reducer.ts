import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from '~/store/api/auth/auth.api';
import { EXPIRES } from '~/utils/constants';

export interface AuthState {
  expires?: Date;
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
  expires: getValidExpiresFromStorage()
};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        authApi.endpoints.refresh.matchFulfilled,
        authApi.endpoints.login.matchFulfilled
      ),
      (state, { payload }) => {
        const expires = new Date(Date.now() + payload.expires_in * 1000);
        state.expires = expires;
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
        state.expires = undefined;
        localStorage.removeItem(EXPIRES);
      }
    );
  }
});

export const { loginInitiated } = authReducer.actions;
