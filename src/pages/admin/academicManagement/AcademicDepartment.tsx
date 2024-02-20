import {Table} from "antd";
import {useGetAllAcademicDepartmentsQuery} from "../../../redux/features/admin/academicManagement.api";
import {IAcademicDepartment} from "../../../types/academicManagement.type";

const AcademicDepartment = () => {
  const {data: academicDepartments, isFetching} =
    useGetAllAcademicDepartmentsQuery(undefined);

  const tableData = academicDepartments?.data?.map(
    (item: IAcademicDepartment) => ({
      name: item.name,
      academicFaculty: item.academicFaculty.name,
    })
  );

  const columns = [
    {
      key: "name",
      title: "Department Name",
      dataIndex: "name",
    },
    {
      key: "academicFaculty",
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
    },
  ];

  return (
    <div>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </div>
  );
};

export default AcademicDepartment;
