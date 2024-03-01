import {Button, Col, Flex} from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllAcademicFacultiesQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import {
  IAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "../../../types/academicManagement.type";
import {
  useAddOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllSemesterRegistrationsQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {TCourse, TSemester} from "../../../types";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import {useState} from "react";
import {FieldValues, SubmitHandler} from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import PHTimePicker from "../../../components/form/PHTimePicker";
import {weekDaysOptions} from "../../../constants/global";
import moment from "moment";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

const OfferCourse = () => {
  const [addOfferedCourse] = useAddOfferedCourseMutation();
  const [courseId, setCourseId] = useState<string>("");
  const navigate = useNavigate();
  const {data: academicFaculties} = useGetAllAcademicFacultiesQuery(undefined);
  const {data: academicDepartments} =
    useGetAllAcademicDepartmentsQuery(undefined);
  const {data: academicSemesters} = useGetAllSemestersQuery(undefined);
  const {data: courses} = useGetAllCoursesQuery(undefined);
  const {data: courseFaculties, isFetching: fetchingFaculties} =
    useGetCourseFacultiesQuery(courseId, {
      skip: !courseId,
    });
  const {data: semesterRegistrations} = useGetAllSemesterRegistrationsQuery([
    {name: "sort", value: "year"},
    {name: "status", value: "UPCOMING"},
  ]);

  const semesterRegistrationOptions = semesterRegistrations?.data?.map(
    (item: TSemester) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultiesOptions = academicFaculties?.data?.map(
    (item: TAcademicFaculty) => ({
      value: item._id,
      label: item.name,
    })
  );

  const academicSemestersOptions = academicSemesters?.data?.map(
    (item: TAcademicSemester) => ({
      value: item._id,
      label: `${item.name} ${item.year}`,
    })
  );

  const academicDepartmentsOptions = academicDepartments?.data?.map(
    (item: IAcademicDepartment) => ({
      value: item._id,
      label: item.name,
    })
  );

  const coursesOptions = courses?.data?.map((item: TCourse) => ({
    value: item._id,
    label: item.title,
  }));

  const facultyOptions = courseFaculties?.data?.faculties?.map(
    (item: {_id: string; fullName: string}) => ({
      value: item._id,
      label: item.fullName,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Offered Course Data ¯_(ツ)_/¯ ");

    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };
    try {
      const res = await addOfferedCourse(offeredCourseData).unwrap();
      if (res.success) {
        toast.success(res.message, {id: toastId, duration: 2000});
        navigate("/admin/offered-courses");
      } else {
        toast.error(res.data.message, {id: toastId});
      }
    } catch (error: any) {
      toast.error(error.data.message, {id: toastId, duration: 2000});
    }
  };
  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={8}>
          <PHForm onSubmit={onSubmit}>
            <PHSelect
              label="Semester Registration"
              name="semesterRegistration"
              options={semesterRegistrationOptions}
            />
            <PHSelect
              label="Academic Faculty"
              name="academicFaculty"
              options={academicFacultiesOptions}
            />
            <PHSelect
              label="Academic Semester"
              name="academicSemester"
              options={academicSemestersOptions}
            />
            <PHSelect
              label="Academic Department"
              name="academicDepartment"
              options={academicDepartmentsOptions}
            />
            <PHSelectWithWatch
              onValueChange={setCourseId}
              label="Course"
              name="course"
              options={coursesOptions}
            />
            <PHSelect
              disabled={!courseId || fetchingFaculties}
              label="Faculty"
              name="faculty"
              options={facultyOptions}
            />
            <PHInput type="text" name="section" label="Section" />
            <PHInput type="text" name="maxCapacity" label="Max Capacity" />
            <PHSelect
              mode="multiple"
              options={weekDaysOptions}
              name="days"
              label="Days"
            />
            <PHTimePicker name="startTime" label="Start Time" />
            <PHTimePicker name="endTime" label="End Time" />

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default OfferCourse;
