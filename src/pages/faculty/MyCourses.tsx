import {Button, Col, Flex} from "antd";
import PHForm from "../../components/form/PHForm";
import PHSelect from "../../components/form/PHSelect";
import {useGetAllFacultyCoursesQuery} from "../../redux/features/faculty/facultyCourses.api";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {useNavigate} from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();
  const {data: facultyCourses} = useGetAllFacultyCoursesQuery(undefined);

  const semesterOptions = facultyCourses?.data?.map(
    (item: {
      academicSemester: {name: string; year: number};
      semesterRegistration: {_id: string};
    }) => ({
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
      value: item.semesterRegistration._id,
    })
  );

  const courseOptions = facultyCourses?.data?.map(
    (item: {course: {title: string; _id: string}}) => ({
      label: item.course.title,
      value: item.course._id,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            options={semesterOptions}
            name="semesterRegistration"
            label="Semester"
          />
          <PHSelect options={courseOptions} name="course" label="Course" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
