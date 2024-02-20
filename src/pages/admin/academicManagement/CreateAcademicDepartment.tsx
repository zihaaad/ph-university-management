import {Button, Col, Flex} from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {FieldValues} from "react-hook-form";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import {TAcademicFaculty} from "../../../types/academicManagement.type";
import {BarLoader} from "react-spinners";
import {CSSProperties} from "react";
import {toast} from "sonner";

const override: CSSProperties = {
  display: "block",
  margin: "3rem auto",
  borderColor: "red",
};

const CreateAcademicDepartment = () => {
  const {data: academicFacultiesData, isFetching} =
    useGetAllAcademicFacultiesQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const academicFacultyOptions: {label: string; value: string}[] = [];

  academicFacultiesData?.data?.forEach((item: TAcademicFaculty) =>
    academicFacultyOptions.push({label: item.name, value: item.name})
  );

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating Data ¯_(ツ)_/¯ ");

    const academicFaculty = academicFacultiesData?.data?.find(
      (item: TAcademicFaculty) => item?.name === data?.academicFaculty
    );
    try {
      const res = await addAcademicDepartment({
        name: data.name,
        academicFaculty: academicFaculty?._id,
      }).unwrap();
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
    <>
      {isFetching ? (
        <BarLoader
          color={"lightblue"}
          loading={isFetching}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <Flex justify="center" align="center">
          <Col span={8}>
            <PHForm onSubmit={onSubmit}>
              <PHInput
                name="name"
                label="Academic Department Name"
                type="text"
              />
              <PHSelect
                label="Academic Faculty ID"
                name="academicFaculty"
                options={academicFacultyOptions}
              />
              <Button htmlType="submit">Submit</Button>
            </PHForm>
          </Col>
        </Flex>
      )}
    </>
  );
};

export default CreateAcademicDepartment;
