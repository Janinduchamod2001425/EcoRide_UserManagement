import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/incidentDetails";

export const incidentApiSLice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveIncidentData: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    // register: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    // logout: builder.mutation({
    //   query: () => ({
    //     url: `${USERS_URL}/logout`,
    //     method: "POST",
    //   }),
    // }),

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
        // console.log("Data to be sent:", id); // Log the data
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
  }),
});

export const {
  useSaveIncidentDataMutation,
  useGetAllIncidentDataMutation,
  useGetByIdMutation,
  useUpdateIncidentDataMutation,
  useDeleteIncidentReportMutation,
} = incidentApiSLice;
