import {baseApi} from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "semester-registration/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {useAddSemesterRegistrationMutation} = courseManagementApi;
