import type { FetchBaseQueryError, QueryReturnValue } from '@reduxjs/toolkit/query';
import { api } from '~/store/api/api';
import { endpoints } from '~/store/api/endpoints';
import type { FsNodeDto, FsNodeSearch } from '~/store/api/node/fs.type';

export const fsApi = api.injectEndpoints?.({
  endpoints: (builder) => (
    {
      searchFs: builder.query<FsNodeDto[], FsNodeSearch>({
        query: (params) => (
          {
            url: endpoints.fs.search,
            method: 'GET',
            params
          }
        )
      }),
      download: builder.mutation<Blob, string>({
        queryFn: async (id, _queryApi, _extraOptions, fetchWithBQ) => {
          const response = await fetchWithBQ({
            url: endpoints.fs.download(id),
            method: 'GET',
            responseHandler: (response) => response.blob()
          }) as QueryReturnValue<Blob, FetchBaseQueryError, { response: Response }>;

          if (response.error) {
            return { error: response.error };
          }

          return { data: response.data as Blob };
        }
      })
    }
  ),
  overrideExisting: true
});

export const {
  useSearchFsQuery,
  useLazySearchFsQuery,
  useDownloadMutation
} = fsApi;
