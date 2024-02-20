import {useGetAllSemestersQuery} from "../../../redux/features/admin/academicManagement.api";

const AcademicSemester = () => {
  const {data} = useGetAllSemestersQuery(undefined);
  console.log(data);

  return <div>Academic Semester: {data?.data?.length}</div>;
};

export default AcademicSemester;
