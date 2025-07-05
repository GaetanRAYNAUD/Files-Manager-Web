import { api } from '~/store/api/api';
import type { AuthTokenDto, AuthTokensDto } from '~/store/api/auth/auth.type';
import { endpoints } from '~/store/api/endpoints';

export const authApi = api.injectEndpoints?.({
  endpoints: (builder) => (
    {
      refresh: builder.mutation<AuthTokensDto, void>({
        query: () => (
          {
            url: endpoints.public.refresh,
            method: 'POST'
          }
        )
      }),
      logout: builder.mutation<void, void>({
        query: () => (
          {
            url: endpoints.public.logout,
            method: 'POST'
          }
        )
      }),
      loginDiscord: builder.mutation<AuthTokensDto, void>({
        query: () => (
          {
            url: endpoints.public.login.discord,
            method: 'POST'
          }
        )
      }),
      loginGithub: builder.mutation<AuthTokensDto, void>({
        query: () => (
          {
            url: endpoints.public.login.github,
            method: 'POST'
          }
        )
      }),
      loginTwitch: builder.mutation<AuthTokensDto, void>({
        query: () => (
          {
            url: endpoints.public.login.twitch,
            method: 'POST'
          }
        )
      }),
      loginAmazon: builder.mutation<AuthTokensDto, void>({
        query: () => (
          {
            url: endpoints.public.login.amazon,
            method: 'POST'
          }
        )
      }),
      loginGoogle: builder.mutation<AuthTokensDto, AuthTokenDto>({
        query: ({ token }) => (
          {
            url: endpoints.public.login.google,
            method: 'POST',
            headers: {
              'X-Id-Token': token
            }
          }
        )
      })
    }
  ),
  overrideExisting: true
});

export const {
  useRefreshMutation,
  useLoginAmazonMutation,
  useLoginGoogleMutation,
  useLoginDiscordMutation,
  useLoginGithubMutation,
  useLoginTwitchMutation
} = authApi;
