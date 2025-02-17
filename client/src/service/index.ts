import { apiSlice } from "./base-query";

export const indexApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatisticByRace: builder.query({
      query: () => ({
        method: "GET",
        url: "/citizens/races",
      }),
    }),
    getStatisticsByReligion: builder.query({
      query: () => ({
        method: "GET",
        url: "/citizens/religions",
      }),
    })
  })
});

export const {
  useGetStatisticsByReligionQuery,
  useGetStatisticByRaceQuery,
} = indexApi;