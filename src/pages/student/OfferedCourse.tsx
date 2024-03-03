import {Button, Col, Row} from "antd";
import {
  useEnrollCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagement.api";
import {TOfferedCourseItem} from "../../types/studentCourseManagement";
import {toast} from "sonner";
import Loader from "../../components/ui/Loader";

type TCourse = {
  [index: string]: any;
};

const OfferedCourse = () => {
  const {
    data: offeredCourses,
    isFetching,
    isLoading,
  } = useGetAllOfferedCoursesQuery(undefined);
  const [enroll] = useEnrollCourseMutation();

  const singleObject = offeredCourses?.data?.reduce((acc: TCourse, item) => {
    const key = item.course.title;

    acc[key] = acc[key] || {_id: item._id, courseTitle: key, sections: []};

    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });

    return acc;
  }, {});

  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll = async (id: string) => {
    const enrollData = {
      offeredCourse: id,
    };
    const toastId = toast.loading("Enrolling The Course ¯_(ツ)_/¯");
    try {
      const res = await enroll(enrollData).unwrap();
      if (res.success) {
        toast.success(res.message, {id: toastId, duration: 2000});
      } else {
        toast.error(res.data.message, {id: toastId});
      }
    } catch (error: any) {
      toast.error(error.data.message, {id: toastId, duration: 2000});
    }
  };

  if (isFetching || isLoading) {
    return <Loader />;
  }

  if (!modifiedData.length) {
    return <h2>No Available Courses</h2>;
  }

  return (
    <Row gutter={[0, 10]}>
      {modifiedData.map((item) => {
        return (
          <Col
            span={24}
            style={{border: "solid #d4d4d4 2px", borderRadius: "5px"}}
            key={item._id}>
            <div style={{padding: "10px"}}>
              <h2>{(item as TOfferedCourseItem).courseTitle}</h2>
            </div>
            <div>
              {(item as TOfferedCourseItem).sections.map((section) => {
                return (
                  <Row
                    key={section._id}
                    justify={"space-between"}
                    align={"middle"}
                    style={{
                      borderTop: "solid #d4d4d4 2px",
                      padding: "10px",
                      borderRadius: "5px",
                    }}>
                    <Col span={5}>Section: {section.section}</Col>
                    <Col span={5}>
                      Days:{" "}
                      {section.days.map((day) => (
                        <span key={day} style={{margin: "0 3px"}}>
                          {day},
                        </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime}</Col>
                    <Col span={5}>End Time: {section.endTime}</Col>
                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
