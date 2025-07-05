import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type BaseQueryFn, createApi, type FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '~/env';

const rawBaseQuery = fetchBaseQuery({
  timeout: 60000,
  credentials: 'include',
  redirect: 'manual',
  prepareHeaders: (headers, { getState }) => {
    headers.set('X-Client-Type', 'WEB');

    return headers;
  }
});

const dynamicBaseQuery: BaseQueryFn<FetchArgs & { mock?: boolean; mockRequestTime?: number }, unknown, FetchBaseQueryError> =
  async (args, api, extraOptions) => {
    const basePath = args.url!;

    // use real api
    const baseUrl = env.VITE_API_URL;
    const adjustedUrl = `${ baseUrl }${ basePath }`;
    return rawBaseQuery({ ...args, url: adjustedUrl }, api, extraOptions);
  };
export const api = createApi({
  reducerPath: 'api',
  baseQuery: dynamicBaseQuery,
  endpoints: () => (
    {}
  )
});