import { IGotra } from "@/redux/types";
import { Button, message, Popconfirm, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GenericTable } from "../common/GenericTable";
import { useState } from "react";
import { useGetGotrasQuery } from "@/redux/features/masterGotra";

interface iProps {
  handleDelete: any;
  handleEdit: any;
  handleSort: any;
  isLoading: any;
  pagination: any;
  data: any;
}

const GotraTable = (props: iProps) => {
  const { handleDelete, handleEdit, handleSort, isLoading, pagination, data } =
    props;

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
        handleSort={handleSort}
        loading={isLoading}
        data={data}
        pagination={pagination}
        columns={columns}
      />
    </>
  );
};

export default GotraTable;
