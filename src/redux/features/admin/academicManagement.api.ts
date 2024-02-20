import {TQueryParams, TResponseRedux} from "../../../types";
import {TAcademicSemester} from "../../../types/academicManagement.type";
import {baseApi} from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {useGetAllSemestersQuery, useAddAcademicSemesterMutation} =
  academicManagementApi;