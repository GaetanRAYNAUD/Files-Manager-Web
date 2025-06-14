import { api } from '~/store/api/api';
import { endpoints } from '~/store/api/endpoints';
import type { ProfileDto } from '~/store/api/user/user.type';

export const usersApi = api.injectEndpoints?.({
  endpoints: (builder) => (
    {
      getProfile: builder.query<ProfileDto, void>({
        query: () => (
          {
            url: endpoints.users.profile,
            method: 'GET'
          }
        )
      })
    }
  ),
  overrideExisting: true
});

export const {
  useGetProfileQuery
} = usersApi;
