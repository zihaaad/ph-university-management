import {TCourse, TQueryParams, TResponseRedux, TSemester} from "../../../types";
import {baseApi} from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesterRegistrations: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TResponseRedux<TSemester[]>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
      providesTags: ["semesters"],
    }),

    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semesters"],
    }),
    updateSemesterRegistration: builder.mutation({
      query: (args) => ({
        url: `semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semesters"],
    }),
    getAllCourses: builder.query({
      query: () => {
        return {
          url: "/courses",
          method: "GET",
        };
      },
      transformResponse: (res: TResponseRedux<TCourse[]>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
      providesTags: ["courses"],
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
    addFaculties: builder.mutation({
      query: (args) => {
        console.log(args);

        return {
          url: `/courses/${args.courseId}/assign-faculties`,
          method: "PUT",
          body: args.data,
        };
      },
      invalidatesTags: ["courses"],
    }),
    getCourseFaculties: builder.query({
      query: (id) => {
        return {
          url: `/courses/${id}/get-faculties`,
          method: "GET",
        };
      },
    }),
    addOfferedCourse: builder.mutation({
      query: (data) => ({
        url: "/offered-courses/create-offered-course",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetAllSemesterRegistrationsQuery,
  useUpdateSemesterRegistrationMutation,
  useAddOfferedCourseMutation,
  useAddFacultiesMutation,
  useAddCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseFacultiesQuery,
} = courseManagementApi;
