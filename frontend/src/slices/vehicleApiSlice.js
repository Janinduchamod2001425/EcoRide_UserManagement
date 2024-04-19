import { apiSlice } from "./apiSlice";

const VEHICLES_URL = "/api/vehicles";

export const vehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    add: builder.mutation({
      query: (data) => ({
        url: `${VEHICLES_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    getVehiclesByOwnerId: builder.mutation({
      query: (data) => ({
        url: `${VEHICLES_URL}/getowner/${data}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddMutation, useGetVehiclesByOwnerIdMutation } =
  vehicleApiSlice;
