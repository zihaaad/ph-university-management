import {Button, Table} from "antd";
import type {TableColumnsType, TableProps} from "antd";
import {useGetAllSemestersQuery} from "../../../redux/features/admin/academicManagement.api";
import {TAcademicSemester} from "../../../types/academicManagement.type";
import {useState} from "react";
import {TQueryParams} from "../../../types";

type TTableData = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const {data: semesters, isFetching} = useGetAllSemestersQuery(params);

  // console.log(semesters);

  const tableData = semesters?.data?.map(
    ({_id, name, year, startMonth, endMonth}) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      key: "year",
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
    },
    {
      key: "startMonth",
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      key: "endMonth",
      title: "End Month",
      dataIndex: "endMonth",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
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
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
      />
    </div>
  );
};

export default AcademicSemester;
