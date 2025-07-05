import type { RootState } from '~/store/store';

export const selectAuthExpires = (state: RootState) => state.auth.expires;