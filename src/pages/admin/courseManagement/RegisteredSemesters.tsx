import {Button, Dropdown, Table, Tag} from "antd";
import type {TableColumnsType} from "antd";
import {useGetAllSemesterRegistrationsQuery} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import {TSemester} from "../../../types";

export type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const RegisteredSemesters = () => {
  const {
    data: registeredSemesters,
    isLoading,
    isFetching,
  } = useGetAllSemesterRegistrationsQuery(undefined);

  const tableData = registeredSemesters?.data?.map(
    ({_id, academicSemester, status, startDate, endDate}) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(startDate).format("MMMM Do YYYY, h:mm:ss a"),
      endDate: moment(endDate).format("MMMM Do YYYY, h:mm:ss a"),
    })
  );

  const handleStatusDropdown = (data) => {
    console.log(data);
  };

  const menuProps = {
    items,
    onClick: handleStatusDropdown,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      key: "startDate",
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      key: "endDate",
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Dropdown menu={menuProps}>
            <Button>Update</Button>
          </Dropdown>
        );
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

export default RegisteredSemesters;
