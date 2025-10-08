import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../store/config";

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/contents`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Content"],
  endpoints: (builder) => ({
    listContent: builder.query({
      query: ({ type, parent_id, search } = {}) => ({
        url: "/",
        params: { type, parent_id, search },
      }),
      providesTags: ["Content"],
    }),
    createContent: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Content"],
    }),
    uploadFile: builder.mutation({
      query: ({ file, parent_id }) => {
        const formData = new FormData();
        formData.append("file", file);
        if (parent_id) formData.append("parent_id", parent_id);
        return {
          url: "/upload",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Content"],
    }),
    deleteContent: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Content"],
    }),
    updateContent: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Content"],
    }),
  }),
});

export const {
  useListContentQuery,
  useCreateContentMutation,
  useUploadFileMutation,
  useDeleteContentMutation,
  useUpdateContentMutation,
} = contentApi;
