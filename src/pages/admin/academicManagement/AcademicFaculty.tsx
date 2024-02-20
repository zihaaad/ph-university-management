import {Table} from "antd";
import {useGetAllAcademicFacultiesQuery} from "../../../redux/features/admin/academicManagement.api";

export const AcademicFaculty = () => {
  const {data: academicFaculties, isFetching} =
    useGetAllAcademicFacultiesQuery(undefined);

  const tableData = academicFaculties?.data?.map(({name}: {name: string}) => ({
    key: name,
    name,
  }));

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
  ];

  return (
    <div>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </div>
  );
};
