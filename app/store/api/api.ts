import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type BaseQueryFn, createApi, type FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '~/env';
import { endpoints } from '~/store/api/endpoints';

const rawBaseQuery = fetchBaseQuery({
  timeout: 60000,
  credentials: 'include',
  redirect: 'manual',
  prepareHeaders: (headers) => {
    headers.set('X-Client-Type', 'WEB');

    return headers;
  }
});

const dynamicBaseQuery: BaseQueryFn<FetchArgs & { mock?: boolean; mockRequestTime?: number }, unknown, FetchBaseQueryError> =
  async (args, api, extraOptions) => {
    const basePath = args.url!;

    const baseUrl = env.VITE_API_URL;
    const adjustedUrl = `${ baseUrl }${ basePath }`;
    let result = await rawBaseQuery({ ...args, url: adjustedUrl }, api, extraOptions);

    if (result.error && result.error.status === 401) {
      const refreshResult = await rawBaseQuery({ url: baseUrl + endpoints.public.refresh, method: 'POST' }, api, extraOptions);

      if (refreshResult.data) {
        result = await rawBaseQuery({ ...args, url: adjustedUrl }, api, extraOptions);
      } else {
        rawBaseQuery({ url: baseUrl + endpoints.public.logout, method: 'POST' }, api, extraOptions);
      }
    }

    return result;
  };

export const api = createApi({
  reducerPath: 'api',
  baseQuery: dynamicBaseQuery,
  endpoints: () => (
    {}
  )
});