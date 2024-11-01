import { OMDbApiSlice } from "../omdbApiSlice";

// API endpoints are injected in the previous declared ApiSlice
const extendedOmdbApi = OMDbApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query({
      query: ({ query, page, type, year }) => ({
        url: "",
        method: "GET",
        // Definition of requests parameters
        params: {
          apikey: process.env.REACT_APP_OMDB_API_KEY,
          s: query,
          page: page ? page : 1,
          type: type ? type : null,
          y: year ? year : null,
        },
      }),
    }),
    getItemDetails: builder.query({
      query: ({ imdbID }) => ({
        url: "",
        method: "GET",
        // Definition of requests parameters

        params: {
          apikey: process.env.REACT_APP_OMDB_API_KEY,
          i: imdbID,
          plot: "full",
        },
      }),
    }),
  }),
});

// esport of request methods to be used in others files
export const { useSearchQuery, useGetItemDetailsQuery } = extendedOmdbApi;
