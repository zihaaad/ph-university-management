import {Button, Col, Flex} from "antd";
import PHForm from "../../../components/form/PHForm";
import {FieldValues, SubmitHandler} from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import {semesterStatusOptions} from "../../../constants/semester";
import {toast} from "sonner";
import {useGetAllSemestersQuery} from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import {useAddSemesterRegistrationMutation} from "../../../redux/features/admin/courseManagement.api";

const SemesterRegistration = () => {
  const {data: academicSemester} = useGetAllSemestersQuery([
    {name: "sort", value: "year"},
  ]);

  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Data ¯_(ツ)_/¯ ");
    data.minCredit = Number(data.minCredit);
    data.maxCredit = Number(data.maxCredit);
    const semesterData = {
      ...data,
    };

    try {
      const res = await addSemesterRegistration(semesterData).unwrap();
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
          <PHSelect
            label="Name"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PHSelect
            label="Status"
            name="status"
            options={semesterStatusOptions}
          />
          <PHDatePicker label="Start Date" name="startDate" />
          <PHDatePicker label="End Month" name="endDate" />
          <PHInput type="number" name="minCredit" label="Min Credit" />
          <PHInput type="number" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
