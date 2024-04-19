import { apiSlice } from "./apiSlice";

const LICENSES_URL = "/api/licenses";

export const licenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addlicense: builder.mutation({
      query: (data) => ({
        url: `${LICENSES_URL}/addlicense`,
        method: "POST",
        body: data,
      }),
    }),

    getLicenseByDriverId: builder.mutation({
      query: (data) => ({
        url: `${LICENSES_URL}/getlicense/${data}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddlicenseMutation, useGetLicenseByDriverIdMutation } = licenseApiSlice;
