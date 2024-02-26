import {Button, Dropdown, Table, Tag} from "antd";
import type {TableColumnsType} from "antd";
import {
  useGetAllSemesterRegistrationsQuery,
  useUpdateSemesterRegistrationMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import {TSemester} from "../../../types";
import {useState} from "react";
import {toast} from "sonner";

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
  const [semesterId, setSemesterId] = useState("");
  const [updateSemesterStatus] = useUpdateSemesterRegistrationMutation();
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
      startDate: moment(startDate).format("MMMM Do YYYY, h A"),
      endDate: moment(endDate).format("MMMM Do YYYY, h A"),
    })
  );

  const handleStatusChange = async (data: {key: string}) => {
    const toastId = toast.loading("Updating Status ¯_(ツ)_/¯ ");
    const updatedData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };

    try {
      const res = await updateSemesterStatus(updatedData).unwrap();
      if (res.success) {
        toast.success(res.message, {id: toastId, duration: 2000});
      } else {
        toast.error(res.data.message, {id: toastId});
      }
    } catch (error: any) {
      toast.error(error.data.message, {id: toastId, duration: 2000});
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusChange,
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
      render: (item) => {
        return (
          <Dropdown trigger={["click"]} menu={menuProps}>
            <Button onClick={() => setSemesterId(item.key)}>
              Change Status
            </Button>
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
