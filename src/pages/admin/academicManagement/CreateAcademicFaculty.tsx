import {Button, Col, Flex} from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import {FieldValues} from "react-hook-form";
import {useAddAcademicFacultyMutation} from "../../../redux/features/admin/academicManagement.api";
import {toast} from "sonner";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating Data ¯_(ツ)_/¯");
    try {
      const res = await addAcademicFaculty(data).unwrap();
      if (res.success) {
        toast.success(res.message, {id: toastId, duration: 2000});
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
          <PHInput name="name" label="Academic Faculty Name" type="text" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
