import {FieldValues, SubmitHandler} from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import {Button, Col, Divider, Row} from "antd";

// const studentDummyData = {
//   password: "student123",
//   student: {
//     name: {
//       firstName: "Zihadul",
//       lastName: "Islam",
//     },
//     gender: "male",
//     dateOfBirth: "1990-01-01",
//     email: "zihad@example.com",
//     contactNo: "1234567890",
//     emergencyContactNo: "9876543210",
//     bloodGroup: "A+",
//     presentAddress: "123 Main Street, Cityville",
//     permanentAddress: "456 Oak Avenue, Townsville",
//     guardian: {
//       fatherName: "Robert Doe",
//       fatherOccupation: "Engineer",
//       fatherContactNo: "1112223333",
//       motherName: "Alice Doe",
//       motherOccupation: "Doctor",
//       motherContactNo: "4445556666",
//     },
//     localGuardian: {
//       name: "Jane Doe",
//       occupation: "Teacher",
//       contactNo: "7778889999",
//       address: "789 Pine Road, Villageland",
//     },
//     admissionSemester: "65cc7a7434dd84dc6b39cc96",
//     academicDepartment: "65cc71e94191eb1ee928147c",
//   },
// };

const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  console.log(Object.fromEntries(formData));
};

const CreateStudent = () => {
  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              {" "}
              <PHInput type="text" name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput type="text" name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput type="text" name="bloodGroup" label="Blood Group" />
            </Col>
          </Row>
          <Divider>Contact Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput type="text" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No"
              />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              {" "}
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Divider>Guardian Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father Contact No"
              />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              {" "}
              <PHInput type="text" name="motherName" label="Mother Name" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother Contact No"
              />
            </Col>
          </Row>
          <Divider>Local Guardian Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              {" "}
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
