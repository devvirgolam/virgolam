import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../store/config";
export const catalogueApi = createApi({
  reducerPath: "catalogueApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/catalogue`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Catalogue"],
  endpoints: (builder) => ({
    // ---- Public Routes ----
    listCatalogues: builder.query({
      query: () => "/",
      providesTags: ["Catalogue"],
    }),
    getCatalogueById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Catalogue", id }],
    }),

    // ---- Protected Routes ----
    createCatalogue: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Catalogue"],
    }),
    updateCatalogue: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Catalogue", id }],
    }),
    deleteCatalogue: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Catalogue"],
    }),
  }),
});

export const {
  useListCataloguesQuery,
  useGetCatalogueByIdQuery,
  useCreateCatalogueMutation,
  useUpdateCatalogueMutation,
  useDeleteCatalogueMutation,
} = catalogueApi;
