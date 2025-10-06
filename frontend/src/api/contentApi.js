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
    // ---- Public Route ----
    listContent: builder.query({
      query: () => "/",
      providesTags: ["Content"],
    }),

    // ---- Protected Route ----
    createContent: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Content"],
    }),
  }),
});

export const { useListContentQuery, useCreateContentMutation } = contentApi;
