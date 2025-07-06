import { api } from '~/store/api/api';
import type { AuthTokenRequestDto, AuthTokensDto } from '~/store/api/auth/auth.type';
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
      login: builder.mutation<AuthTokensDto, AuthTokenRequestDto>({
        query: ({ token, provider }) => (
          {
            url: endpoints.public.login.exchangeToken(provider),
            method: 'POST',
            body: {
              token
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
  useLoginMutation,
  useLogoutMutation
} = authApi;
