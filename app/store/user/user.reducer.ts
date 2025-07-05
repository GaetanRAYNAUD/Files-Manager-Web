import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from '~/store/api/auth/auth.api';
import { usersApi } from '~/store/api/user/user.api';
import type { ProfileDto } from '~/store/api/user/user.type';

export interface UserState {
  profile?: ProfileDto;
}

const initialState: UserState = {};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.getProfile.matchFulfilled,
      (state, { payload }) => {
        state.profile = payload;
      }
    );
    builder.addMatcher(
      isAnyOf(usersApi.endpoints.getProfile.matchRejected, authApi.endpoints.logout.matchFulfilled),
      (state) => {
        state.profile = undefined;
      }
    );
  }
});
