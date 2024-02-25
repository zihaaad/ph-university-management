import {useParams} from "react-router-dom";
import {useGetSingleStudentQuery} from "../../../redux/features/admin/userManagement.api";
import Loader from "../../../components/ui/Loader";

const StudentDetails = () => {
  const {id} = useParams();
  const {
    data: studentData,
    isFetching,
    isLoading,
  } = useGetSingleStudentQuery(id);
  console.log(studentData);
  return (
    <>
      {isFetching || isLoading ? (
        <Loader />
      ) : (
        <div>{studentData?.data?.email}</div>
      )}
    </>
  );
};

export default StudentDetails;
