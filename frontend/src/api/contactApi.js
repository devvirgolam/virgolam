import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../store/config";
export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/contacts`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    // ---- Public Route ----
    submitContact: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),

    // ---- Protected Route ----
    listContacts: builder.query({
      query: () => "/",
      providesTags: ["Contact"],
    }),
  }),
});

export const { useSubmitContactMutation, useListContactsQuery } = contactApi;
