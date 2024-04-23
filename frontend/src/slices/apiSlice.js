import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import License from "../../../backend/models/licenseModel";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Package", "Reservation", "Vehicle", License],
  endpoints: (builder) => ({}),
});
