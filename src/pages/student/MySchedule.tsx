import Loader from "../../components/ui/Loader";
import {useGetMyEnrolledCoursesQuery} from "../../redux/features/student/studentCourseManagement.api";

const MySchedule = () => {
  const {data, isFetching, isLoading} = useGetMyEnrolledCoursesQuery(undefined);

  if (isFetching || isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {data?.data?.map((item: any) => {
        return (
          <div key={item._id}>
            <div>Course - {item.course.title}</div>
            <div>Section - {item.offeredCourse.section}</div>
            <div>
              {item.offeredCourse.days.map((day: string) => (
                <span key={day}> {day} </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MySchedule;
