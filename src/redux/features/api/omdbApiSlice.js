import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OMDbApiSlice = createApi({
  reducerPath: "omdb",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_OMDB_BASE_URL,
  }),
  tagTypes: ["Movies"],
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
