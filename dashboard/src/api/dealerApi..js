import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dealerApi = createApi({
  reducerPath: "dealerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/dealers", // adjust if needed
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Dealer"],
  endpoints: (builder) => ({
    // ---- Public Routes ----
    listDealers: builder.query({
      query: () => "/",
      providesTags: ["Dealer"],
    }),
    getDealerById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Dealer", id }],
    }),
    getDealerBySlug: builder.query({
      query: (slug) => `/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Dealer", slug }],
    }),
    contactDealer: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}/contact`,
        method: "POST",
        body: data,
      }),
    }),

    // ---- Protected Routes ----
    createDealer: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Dealer"],
    }),
    updateDealer: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Dealer", id }],
    }),
  }),
});

export const {
  useListDealersQuery,
  useGetDealerByIdQuery,
  useGetDealerBySlugQuery,
  useContactDealerMutation,
  useCreateDealerMutation,
  useUpdateDealerMutation,
} = dealerApi;
