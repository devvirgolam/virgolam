import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/stores", // adjust if needed
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Store"],
  endpoints: (builder) => ({
    // ---- Public Routes ----
    listStores: builder.query({
      query: () => "/",
      providesTags: ["Store"],
    }),
    getStoreById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Store", id }],
    }),
    findStoresByLocation: builder.query({
      query: (params) => ({
        url: "/location",
        params, // e.g., { city: "Mumbai", state: "MH" }
      }),
      providesTags: ["Store"],
    }),

    // ---- Protected Route ----
    createStore: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Store"],
    }),
  }),
});

export const {
  useListStoresQuery,
  useGetStoreByIdQuery,
  useFindStoresByLocationQuery,
  useCreateStoreMutation,
} = storeApi;
