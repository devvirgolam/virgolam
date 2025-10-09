// src/services/api/productApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../store/config";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/products` }), // Adjust baseUrl if your API is hosted elsewhere
  tagTypes: ["Products", "ProductMeta", "Variants"], // For cache invalidation
  endpoints: (builder) => ({
    // Product Endpoints
    getAllProducts: builder.query({
      query: () => "/",
      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    createProduct: builder.mutation({
      query: (product) => ({
        url: "/",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, product }) => ({
        url: `/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Products", id },
        "Products",
      ],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // ProductMeta Endpoints
    getAllProductMeta: builder.query({
      query: () => "/product-meta",
      providesTags: ["ProductMeta"],
    }),

    createProductMeta: builder.mutation({
      query: (meta) => ({
        url: "/product-meta",
        method: "POST",
        body: meta,
      }),
      invalidatesTags: ["ProductMeta"],
    }),

    updateProductMeta: builder.mutation({
      query: ({ id, meta }) => ({
        url: `/product-meta/${id}`,
        method: "PUT",
        body: meta,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ProductMeta", id },
        "ProductMeta",
      ],
    }),

    deleteProductMeta: builder.mutation({
      query: (id) => ({
        url: `/product-meta/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductMeta"],
    }),

    // Variant Endpoints
    getProductVariants: builder.query({
      query: (productId) => `/${productId}/variants`,
      providesTags: (result, error, productId) => [
        { type: "Variants", id: productId },
      ],
    }),

    createVariant: builder.mutation({
      query: (variant) => ({
        url: "/variants",
        method: "POST",
        body: variant,
      }),
      invalidatesTags: (result, error, variant) => [
        { type: "Variants", id: variant.parent_product_id },
        "Products",
      ],
    }),

    updateVariant: builder.mutation({
      query: ({ id, variant }) => ({
        url: `/variants/${id}`,
        method: "PUT",
        body: variant,
      }),
      invalidatesTags: (result, error, { variant }) => [
        { type: "Variants", id: variant.parent_product_id },
        "Products",
      ],
    }),

    deleteVariant: builder.mutation({
      query: (id) => ({
        url: `/variants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Variants", "Products"],
    }),
  }),
});

// Export hooks for usage in React components
export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllProductMetaQuery,
  useCreateProductMetaMutation,
  useUpdateProductMetaMutation,
  useDeleteProductMetaMutation,
  useGetProductVariantsQuery,
  useCreateVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
} = productApi;
