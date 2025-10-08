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
      query: (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        if (data.pdf_file) formData.append("pdf_file", data.pdf_file);
        else if (data.pdf_url) formData.append("pdf_url", data.pdf_url);
        if (data.banner_image_file)
          formData.append("banner_image_file", data.banner_image_file);
        else if (data.banner_image_url)
          formData.append("banner_image_url", data.banner_image_url);
        return {
          url: "/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Catalogue"],
    }),
    updateCatalogue: builder.mutation({
      query: ({ id, ...data }) => {
        const formData = new FormData();
        formData.append("name", data.name);
        if (data.pdf_file) formData.append("pdf_file", data.pdf_file);
        else formData.append("pdf_url", data.pdf_url || "");
        if (data.banner_image_file)
          formData.append("banner_image_file", data.banner_image_file);
        else formData.append("banner_image_url", data.banner_image_url || "");
        return {
          url: `/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Catalogue", id }],
    }),
    deleteCatalogue: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Catalogue"],
    }),
    uploadFile: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useListCataloguesQuery,
  useGetCatalogueByIdQuery,
  useCreateCatalogueMutation,
  useUpdateCatalogueMutation,
  useDeleteCatalogueMutation,
  useUploadFileMutation,
} = catalogueApi;
