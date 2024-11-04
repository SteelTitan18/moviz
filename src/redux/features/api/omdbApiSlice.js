import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// declaration of ApiSlice
export const OMDbApiSlice = createApi({
  reducerPath: "omdb",
  baseQuery: fetchBaseQuery({
    // getting base url from .env
    baseUrl: process.env.REACT_APP_OMDB_BASE_URL,
  }),
  tagTypes: ["Movies"],
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
