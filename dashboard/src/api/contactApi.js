// src/api/contactApi.js
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
        method: data._id ? "PUT" : "POST", // Support both create and update
        body: data,
      }),
      invalidatesTags: ["Contact"], // Invalidate Contact tag to refetch list
    }),

    // ---- Protected Route ----
    listContacts: builder.query({
      query: () => "/",
      providesTags: ["Contact"],
    }),

    // ---- Protected Route ----
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"], // Invalidate Contact tag to refetch list
    }),
  }),
});

export const {
  useSubmitContactMutation,
  useListContactsQuery,
  useDeleteContactMutation,
} = contactApi;
