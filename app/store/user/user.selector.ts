import type { RootState } from '~/store/store';

export const selectProfile = (state: RootState) => state.user.profile;
