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
      })
    }
  ),
  overrideExisting: true
});

export const {
  useSearchFsQuery,
  useLazySearchFsQuery
} = fsApi;
