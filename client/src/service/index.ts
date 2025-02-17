import { apiSlice } from "./base-query";

export const indexApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatisticByGender: builder.query({
      query: () => ({
        method: "GET",
        url: "/citizens/genders",
      }),
    }),
    getStatisticByEducation: builder.query({
      query: () => ({
        method: "GET",
        url: "/citizens/educations",
      }),
    }),
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
  useGetStatisticByEducationQuery,
  useGetStatisticByGenderQuery,
} = indexApi;