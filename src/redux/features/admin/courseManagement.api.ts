import {TResponseRedux, TSemester} from "../../../types";
import {baseApi} from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesterRegistrations: builder.query({
      query: () => {
        return {
          url: "/semester-registrations",
          method: "GET",
        };
      },
      transformResponse: (res: TResponseRedux<TSemester[]>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
      providesTags: ["semesterRegistration"],
    }),
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semesterRegistration"],
    }),
    updateSemesterRegistration: builder.mutation({
      query: (args) => ({
        url: `semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semesterRegistration"],
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetAllSemesterRegistrationsQuery,
  useUpdateSemesterRegistrationMutation,
} = courseManagementApi;
