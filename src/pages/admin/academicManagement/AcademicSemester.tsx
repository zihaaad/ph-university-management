import {useGetAllSemestersQuery} from "../../../redux/features/academicSemester/academicSemesterApi";
import {selectCurrentToken} from "../../../redux/features/auth/authSlice";
import {useAppSelector} from "../../../redux/hooks";

const AcademicSemester = () => {
  const token = useAppSelector(selectCurrentToken);
  const {data} = useGetAllSemestersQuery(token);

  console.log(data);
  return <div></div>;
};

export default AcademicSemester;
