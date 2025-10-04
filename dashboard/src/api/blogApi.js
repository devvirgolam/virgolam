import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/blogs", // adjust if needed
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
    // ---- Public Routes ----
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
    listBlogCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Category"],
    }),

    // ---- Protected Routes ----
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
    createBlogCategory: builder.mutation({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useListBlogsQuery,
  useGetBlogByIdQuery,
  useGetBlogBySlugQuery,
  useListBlogCategoriesQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useCreateBlogCategoryMutation,
} = blogApi;
