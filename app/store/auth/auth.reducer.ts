import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from '~/store/api/auth/auth.api';

export interface AuthState {
  expires?: Date;
}

const initialState: AuthState = {};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        authApi.endpoints.refresh.matchFulfilled,
        authApi.endpoints.loginDiscord.matchFulfilled,
        authApi.endpoints.loginGithub.matchFulfilled,
        authApi.endpoints.loginAmazon.matchFulfilled,
        authApi.endpoints.loginTwitch.matchFulfilled,
        authApi.endpoints.loginGoogle.matchFulfilled
      ),
      (state, { payload }) => {
        console.log(payload);
        state.expires = new Date(Date.now() + payload.expiresIn);
      }
    );
    builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state) => {
        state.expires = undefined;
      }
    );
  }
});
