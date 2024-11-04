import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// declaration of ApiSlice
export const OMDbApiSlice = createApi({
  reducerPath: "omdb",
  baseQuery: fetchBaseQuery({
    // getting base url from .env
    baseUrl: 'http://www.omdbapi.com/',
  }),
  tagTypes: ["Movies"],
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
