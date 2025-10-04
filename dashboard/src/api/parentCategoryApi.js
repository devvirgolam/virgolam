// src/services/parentCategoryApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const parentCategoryApi = createApi({
  reducerPath: "parentCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/parent-category",
  }), // adjust baseUrl
  tagTypes: ["ParentCategory"],
  endpoints: (builder) => ({
    // GET: List all parent categories
    getParentCategories: builder.query({
      query: () => "/",
      providesTags: (result = [], error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "ParentCategory", id })),
              { type: "ParentCategory", id: "LIST" },
            ]
          : [{ type: "ParentCategory", id: "LIST" }],
    }),

    // GET: Single category by id
    getParentCategory: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "ParentCategory", id }],
    }),

    // POST: Create new category
    createParentCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: [{ type: "ParentCategory", id: "LIST" }],
    }),

    // PUT: Update category
    updateParentCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ParentCategory", id },
        { type: "ParentCategory", id: "LIST" },
      ],
    }),

    // DELETE: Delete category
    deleteParentCategory: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ParentCategory", id },
        { type: "ParentCategory", id: "LIST" },
      ],
    }),
  }),
});

// Auto-generated hooks
export const {
  useGetParentCategoriesQuery,
  useGetParentCategoryQuery,
  useCreateParentCategoryMutation,
  useUpdateParentCategoryMutation,
  useDeleteParentCategoryMutation,
} = parentCategoryApi;
