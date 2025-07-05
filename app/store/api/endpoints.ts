const ROOT = 'api';
const PUBLIC = 'public';
const USER = 'user';
const AUTH = 'auth';

export const endpoints = {
  public: {
    login: {
      discord: `/${ PUBLIC }/${ AUTH }/oauth2/discord`,
      github: `/${ PUBLIC }/${ AUTH }/oauth2/github`,
      twitch: `/${ PUBLIC }/${ AUTH }/oauth2/twitch`,
      amazon: `/${ PUBLIC }/${ AUTH }/oauth2/amazon`,
      google: `/${ PUBLIC }/${ AUTH }/oidc/google`
    },
    refresh: `/${ PUBLIC }/${ AUTH }/refresh`,
    logout: `/${ PUBLIC }/${ AUTH }/logout`
  },
  users: {
    profile: `/${ ROOT }/${ USER }/profile`
  }
};