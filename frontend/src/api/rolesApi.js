import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../store/config";
export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/roles`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Role"],
  endpoints: (builder) => ({
    // ---- Public Route ----
    listRoles: builder.query({
      query: () => "/",
      providesTags: ["Role"],
    }),

    // ---- Protected Routes ----
    createRole: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Role"],
    }),
    updateRole: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Role", id }],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),
  }),
});

export const {
  useListRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi;
