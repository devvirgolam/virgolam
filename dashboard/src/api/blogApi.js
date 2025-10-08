import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../store/config";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/blogs`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Blog", "Category"],
  endpoints: (builder) => ({
    // Blog endpoints (unchanged)
    listBlogs: builder.query({
      query: () => "/",
      providesTags: ["Blog"],
    }),
    getBlogById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Blog", id }],
    }),
    getBlogBySlug: builder.query({
      query: (slug) => `/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Blog", slug }],
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Blog", id }],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
    // Category endpoints
    fetchAllBlogCategories: builder.query({
      query: ({ sort = "name", order = "asc" } = {}) =>
        `/categories?sort=${sort}&order=${order}`,
      providesTags: ["Category"],
    }),
    fetchBlogCategoryById: builder.query({
      query: (id) => `/categories/${id}`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),
    createBlogCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateBlogCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Category", id },
        "Category",
      ],
    }),
    deleteBlogCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useListBlogsQuery,
  useGetBlogByIdQuery,
  useGetBlogBySlugQuery,
  useFetchAllBlogCategoriesQuery,
  useFetchBlogCategoryByIdQuery,
  useCreateBlogCategoryMutation,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
