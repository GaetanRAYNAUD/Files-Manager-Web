import type { SupportedProvider } from '~/auth/auth.types';

const ROOT = 'api';
const PUBLIC = 'public';
const USER = 'user';
const AUTH = 'auth';
const FS = 'fs';

export const endpoints = {
  public: {
    login: {
      exchangeToken: (provider: SupportedProvider) => `/${ PUBLIC }/${ AUTH }/exchange-token/${provider}`
    },
    refresh: `/${ PUBLIC }/${ AUTH }/refresh`,
    logout: `/${ PUBLIC }/${ AUTH }/logout`
  },
  users: {
    profile: `/${ ROOT }/${ USER }/profile`
  },
  fs: {
    search: `/${ ROOT }/${ FS }`
  }
};