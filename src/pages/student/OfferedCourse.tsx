import {Button, Col, Row} from "antd";
import {useGetAllOfferedCoursesQuery} from "../../redux/features/student/studentCourseManagement.api";
import {TOfferedCourseItem} from "../../types/studentCourseManagement";

const OfferedCourse = () => {
  const {data: offeredCourses} = useGetAllOfferedCoursesQuery(undefined);

  const singleObject = offeredCourses?.data?.reduce((acc, item) => {
    const key = item.course.title;

    acc[key] = acc[key] || {courseTitle: key, sections: []};

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

  return (
    <Row gutter={[0, 10]}>
      {modifiedData.map((item, idx) => {
        return (
          <Col
            span={24}
            style={{border: "solid #d4d4d4 2px", borderRadius: "5px"}}
            key={idx}>
            <div style={{padding: "10px"}}>
              <h2>{(item as TOfferedCourseItem).courseTitle}</h2>
            </div>
            <div>
              {(item as TOfferedCourseItem).sections.map((section, idx) => {
                return (
                  <Row
                    key={idx}
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
                        <span style={{margin: "0 3px"}}>{day},</span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime}</Col>
                    <Col span={5}>End Time: {section.endTime}</Col>
                    <Button>Enroll</Button>
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
