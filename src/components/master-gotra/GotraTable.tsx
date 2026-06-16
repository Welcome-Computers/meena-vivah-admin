import { useGetGotrasQuery } from "@/redux/features/masterGotra";
import { IGotra } from "@/redux/types";
import { Button, message, Popconfirm, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { GenericTable } from "../common/GenericTable";

interface iProps {
  handleDelete: any;
  handleEdit: any;
}

const GotraTable = (props: iProps) => {
  const { handleDelete, handleEdit } = props;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Get occupation list
  const { data, isLoading, error } = useGetGotrasQuery({
    page,
    limit: 10,
    ...(search && { search }),
    ...(sortField && { sortField }),
    ...(sortOrder && { sortOrder }),
  });
  const gotraList = data || [];
  const pagination = data?.pagination || {};

  // trigger search
  const handleSearch = (value: string) => {
      if(value.length <3){
      return
    }
    setSearch(value);
  };

  // sorting data
  const handleSort = (sorter: any) => {
    setSortField(sorter.field || "");
    setSortOrder(sorter.order || "");
  };

  const columns: ColumnsType<IGotra> = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 70,
      fixed: "left",
      sorter: (a, b) => (a.code ?? "").localeCompare(b.code ?? ""),
    },

    {
      title: "Gotra Name",
      dataIndex: "name",
      key: "name",
      width: 180,
      fixed: "left",
      sorter: (a, b) => (a.name ?? "").localeCompare(b.name ?? ""),
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
            title="Delet Gotra"
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
      
      setSearch={setSearch}
        handleSort={handleSort}
        handleSearch={handleSearch}
        loading={isLoading}
        data={gotraList}
        pagination={pagination}
        columns={columns}
      />
    </>
  );
};

export default GotraTable;
