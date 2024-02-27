import {Button, Modal, Table} from "antd";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {useState} from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import {useGetAllFacultiesQuery} from "../../../redux/features/admin/userManagement.api";
import {toast} from "sonner";

const Courses = () => {
  const {
    data: courses,
    isLoading,
    isFetching,
  } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({_id, title, code, prefix}) => ({
    key: _id,
    title,
    code: ` ${prefix} ${code}`,
  }));

  const columns = [
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "code",
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item: {key: string}) => {
        return <AddFacultyModal data={item} />;
      },
    },
  ];
  return (
    <div>
      <Table
        loading={isFetching || isLoading}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

const AddFacultyModal = ({data: courseData}: {data: {key: string}}) => {
  const {data: faculties} = useGetAllFacultiesQuery(undefined);
  const [AddFaculties] = useAddFacultiesMutation();

  const facultiesOptions = faculties?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (data: {faculties: string[]}) => {
    const toastId = toast.loading("Creating Course Data ¯_(ツ)_/¯ ");
    const facultyData = {
      courseId: courseData.key,
      data,
    };

    try {
      const res = await AddFaculties(facultyData).unwrap();
      if (res.success) {
        toast.success(res.message, {id: toastId, duration: 2000});
        setIsModalOpen(false);
      } else {
        toast.error(res.data.message, {id: toastId});
      }
    } catch (error: any) {
      toast.error(error.data.message, {id: toastId, duration: 2000});
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="default" onClick={showModal}>
        Assign Faculty
      </Button>
      <Modal
        title="Assign Faculty"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}>
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            label="Select Faculty"
            name="faculties"
            options={facultiesOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
