import {Button, Table} from "antd";
import {useGetAllCoursesQuery} from "../../../redux/features/admin/courseManagement.api";

const Courses = () => {
  const {
    data: courses,
    isLoading,
    isFetching,
  } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({_id, title, code, prefix}) => ({
    key: _id,
    title,
    code: ` ${prefix} ${code}`,
  }));

  const columns = [
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "code",
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return <Button>Assign Faculty</Button>;
      },
    },
  ];
  return (
    <div>
      <Table
        loading={isFetching || isLoading}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default Courses;
