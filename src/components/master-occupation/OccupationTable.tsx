import { IOccupation } from "@/redux/types";
import { Button, message, Popconfirm, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GenericTable } from "../common/GenericTable";
import { useGetOccupationsQuery } from "@/redux/features/masterOccupation";
import { useState } from "react";

interface iProps {
  handleDelete: any;
  handleEdit: any;
}

const OccupationTable = (props: iProps) => {
  const { handleDelete, handleEdit } = props;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
 const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");


  // Get occupation list
  const { data, isLoading, error } = useGetOccupationsQuery({
    page,
    limit: 10,
    ...(search && { search }),
    ...(sortField && {sortField}),
    ...(sortOrder && {sortOrder}),
  });

  const occupationList = data || [];
  const pagination = data?.pagination || {};


  // trigger search
  const handleSearch = (value: string) => {
    if(value.length > 0 && value.length < 3){
      message.error("Enter Minimum 3 Character")
      return
    }
    setSearch(value);
  };


  // sorting data
const handleSort = (sorter: any) => {
  setSortField(sorter.field || "");
  setSortOrder(sorter.order || "");
};

  const columns: ColumnsType<IOccupation> = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 70,
      fixed: "left",
      sorter:true,
    },

    {
      title: "Occupation Name",
      dataIndex: "name",
      key: "name",
      width: 180,
      fixed: "left",
      sorter:true,
    },

    {
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            type="primary"
            onClick={() => handleEdit(record.id, record)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delet Occupation"
            description={`Delete "${record.name}" ?`}
            okText="Delet"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button size="small" type="primary">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <GenericTable
      handleSort={handleSort}
        handleSearch={handleSearch}
        loading={isLoading}
        data={occupationList}
        pagination={pagination}
        columns={columns}
      />
    </>
  );
};

export default OccupationTable;
