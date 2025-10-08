import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../store/config";

export const leadApi = createApi({
  reducerPath: "leadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/leads`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Lead", "LeadNote", "LeadActivity"],
  endpoints: (builder) => ({
    // Fetch all leads
    listLeads: builder.query({
      query: (filters) => ({
        url: "/",
        params: filters, // Supports status, assigned_to, search
      }),
      providesTags: ["Lead"],
    }),

    // Fetch single lead by ID
    getLeadById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Lead", id }],
    }),

    // Create new lead
    createLead: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lead"],
    }),

    // Update existing lead
    updateLead: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Lead", id }],
    }),

    // Delete lead
    deleteLead: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lead"],
    }),

    // Add note
    addNote: builder.mutation({
      query: ({ lead_id, note }) => ({
        url: `/${lead_id}/notes`,
        method: "POST",
        body: { note },
      }),
      invalidatesTags: ["LeadNote"],
    }),

    // Get notes
    getNotes: builder.query({
      query: (lead_id) => `/${lead_id}/notes`,
      providesTags: ["LeadNote"],
    }),

    // Add activity
    addActivity: builder.mutation({
      query: ({ lead_id, ...data }) => ({
        url: `/${lead_id}/activities`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["LeadActivity"],
    }),

    // Mark activity completed
    markActivityCompleted: builder.mutation({
      query: (id) => ({
        url: `/activities/${id}/complete`,
        method: "PUT",
      }),
      invalidatesTags: ["LeadActivity"],
    }),
  }),
});

export const {
  useListLeadsQuery,
  useGetLeadByIdQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
  useAddNoteMutation,
  useGetNotesQuery,
  useAddActivityMutation,
  useMarkActivityCompletedMutation,
} = leadApi;
