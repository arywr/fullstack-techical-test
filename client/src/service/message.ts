import { apiSlice } from "./base-query";

export const indexApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        method: "GET",
        url: "/messages",
      }),
    }),
    sendMessage: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "/messages/send",
        body,
      }),
    })
  })
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = indexApi;