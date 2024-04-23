import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/incidentDetails";

export const incidentApiSLice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveIncidentData: builder.mutation({
      query: (data) => {
        console.log("service", data);
        return {
          url: `${USERS_URL}`,
          method: "POST",
          body: data,
        };
      },
    }),

    updateIncidentData: builder.mutation({
      query: (data) => {
        return {
          url: `${USERS_URL}/${data.id}`,
          method: "PUT",
          body: data.data,
        };
      },
    }),

    deleteIncidentReport: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    getAllIncidentData: builder.mutation({
      query: (id) => {
        console.log("Data:", id); // Log the data
        return {
          url: `${USERS_URL}/findbyuserid/${id}`,
          method: "GET",
        };
      },
    }),

    getById: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
    }),

    getAllIncidentDataAdmin: builder.mutation({
      query: () => {
        return {
          url: `${USERS_URL}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useSaveIncidentDataMutation,
  useGetAllIncidentDataMutation,
  useGetByIdMutation,
  useUpdateIncidentDataMutation,
  useDeleteIncidentReportMutation,
  useGetAllIncidentDataAdminMutation,
} = incidentApiSLice;
