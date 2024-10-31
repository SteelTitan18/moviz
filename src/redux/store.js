import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { OMDbApiSlice } from "./features/api/omdbApiSlice";

export const store = configureStore({
  reducer: {
    [OMDbApiSlice.reducerPath]: OMDbApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(OMDbApiSlice.middleware),
});

setupListeners(store.dispatch);
