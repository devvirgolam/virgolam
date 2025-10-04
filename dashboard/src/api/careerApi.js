import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const careerApi = createApi({
  reducerPath: "careerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/careers", // adjust if needed
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Career", "Candidate"],
  endpoints: (builder) => ({
    // ---- Public Routes ----
    listCareers: builder.query({
      query: () => "/",
      providesTags: ["Career"],
    }),
    submitApplication: builder.mutation({
      query: (data) => ({
        url: "/apply",
        method: "POST",
        body: data,
      }),
    }),

    // ---- Protected Routes ----
    createCareer: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Career"],
    }),
    updateCareer: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Career", id }],
    }),
    deleteCareer: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Career"],
    }),
    listCandidates: builder.query({
      query: () => "/candidates",
      providesTags: ["Candidate"],
    }),
    getCandidateDetails: builder.query({
      query: (id) => `/candidates/${id}`,
      providesTags: (result, error, id) => [{ type: "Candidate", id }],
    }),
  }),
});

export const {
  useListCareersQuery,
  useSubmitApplicationMutation,
  useCreateCareerMutation,
  useUpdateCareerMutation,
  useDeleteCareerMutation,
  useListCandidatesQuery,
  useGetCandidateDetailsQuery,
} = careerApi;
