import {Button, Pagination, Space, Table} from "antd";
import type {TableColumnsType, TableProps} from "antd";
import {useState} from "react";
import {TQueryParams, TStudent} from "../../../types";
import {useGetAllStudentsQuery} from "../../../redux/features/admin/userManagement.api";

type TTableData = Pick<
  TStudent,
  "id" | "email" | "academicDepartment" | "fullName"
>;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(Number);
  const {data: students, isFetching} = useGetAllStudentsQuery([
    {name: "limit", value: 5},
    {name: "page", value: page},
    {name: "sort", value: "id"},
    ...params,
  ]);

  const tableData: any = students?.data?.map(
    ({_id, id, fullName, academicDepartment, email}) => ({
      key: _id,
      id,
      fullName,
      academicDepartment: academicDepartment.name,
      email,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      key: "fullName",
      title: "Name",
      dataIndex: "fullName",
    },
    {
      key: "id",
      title: "Roll",
      dataIndex: "id",
    },
    {
      key: "academicDepartment",
      title: "Academic Department",
      dataIndex: "academicDepartment",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "10%",
    },
  ];
  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({name: "name", value: item})
      );
      filters.year?.forEach((item) =>
        queryParams.push({name: "year", value: item})
      );

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <div style={{marginTop: "1rem"}}>
        <Pagination
          onChange={(value) => setPage(value)}
          pageSize={students?.meta?.limit}
          total={students?.meta?.total}
        />
      </div>
    </>
  );
};

export default StudentData;
