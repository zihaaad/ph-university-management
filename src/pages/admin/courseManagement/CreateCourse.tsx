import {Button, Col, Flex} from "antd";
import PHForm from "../../../components/form/PHForm";
import {FieldValues, SubmitHandler} from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import {toast} from "sonner";
import PHInput from "../../../components/form/PHInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {useNavigate} from "react-router-dom";
import {TPreRequisiteCourse} from "../../../types";

const CreateCourse = () => {
  const navigate = useNavigate();
  const {data: courses} = useGetAllCoursesQuery(undefined);
  const [addCourse] = useAddCourseMutation();

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Course Data ¯_(ツ)_/¯ ");

    data.code = Number(data.code);
    data.credits = Number(data.credits);

    const courseData = {
      ...data,
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data?.preRequisiteCourses.map((item: TPreRequisiteCourse) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    try {
      const res = await addCourse(courseData).unwrap();
      if (res.success) {
        toast.success(res.message, {id: toastId, duration: 2000});
        navigate("/admin/courses");
      } else {
        toast.error(res.data.message, {id: toastId});
      }
    } catch (error: any) {
      toast.error(error.data.message, {id: toastId, duration: 2000});
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" name="title" label="Title" />
          <PHInput type="text" name="prefix" label="Prefix" />
          <PHInput type="number" name="code" label="Code" />
          <PHInput type="number" name="credits" label="Credits" />
          <PHSelect
            mode="multiple"
            options={preRequisiteCoursesOptions}
            name="preRequisiteCourses"
            label="PreRequisite Courses"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
