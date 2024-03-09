import {useParams} from "react-router-dom";
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from "../../redux/features/faculty/facultyCourses.api";
import {Button, Modal, Table} from "antd";
import {useState} from "react";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {toast} from "sonner";
import Loader from "../../components/ui/Loader";

const MyStudents = () => {
  const {registerSemesterId, courseId} = useParams();
  const {
    data: facultyCoursesData,
    isFetching,
    isLoading,
  } = useGetAllFacultyCoursesQuery([
    {name: "semesterRegistration", value: registerSemesterId},
    {name: "course", value: courseId},
  ]);

  if (isFetching || isLoading) {
    return <Loader />;
  }

  const tableData = facultyCoursesData?.data?.map(
    ({_id, student, semesterRegistration, offeredCourse}: any) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Roll",
      key: "roll",
      dataIndex: "roll",
    },
    {
      title: "Action",
      key: "x",
      render: (item: any) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={tableData} />;
};

const AddMarksModal = ({studentInfo}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Adding Marks ¯_(ツ)_/¯ ");
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };

    try {
      const res = await addMark(studentMark).unwrap();
      if (res.success) {
        setIsModalOpen(false);
        toast.success(res.message, {id: toastId, duration: 2000});
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
      <Button onClick={showModal}>Add Marks</Button>
      <Modal
        title="Add Marks"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}>
        <PHForm onSubmit={handleSubmit}>
          <PHInput type="text" name="classTest1" label="Class Test 1" />
          <PHInput type="text" name="classTest2" label="Class Test 2" />
          <PHInput type="text" name="midTerm" label="Midterm" />
          <PHInput type="text" name="finalTerm" label="Final" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default MyStudents;
