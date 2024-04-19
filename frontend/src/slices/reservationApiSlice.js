import { apiSlice } from "./apiSlice";

const RESERVATION_URL = "/api/reservations";

export const reservationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    reservation: builder.mutation({
      query: (data) => ({
        url: `${RESERVATION_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useReservationMutation } = reservationApiSlice;
