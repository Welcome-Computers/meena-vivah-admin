import { IPagination, IUser } from "@/redux/types";

import { Button, Space, Table } from "antd";

import type { ColumnsType } from "antd/es/table";

interface iProps {
  loading: boolean;
  data: IUser[];
  pagination: IPagination;
  handleDelete: any;
  handleEdit: any;
}

const GotraTable = (props: iProps) => {
  const { loading, data, pagination, handleDelete, handleEdit } =
    props;

  console.log("GotraTable data:", data);

  const columns: ColumnsType<IUser> = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 70,
      fixed: "left",
    },

    {
      title: "Gotra Name",
      dataIndex: "name",
      key: "name",
      width: 180,
      fixed: "left",
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
          <Button
            size="small"
            type="primary"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      bordered
      size="small"
      loading={loading}
      dataSource={data}
      columns={columns}
      pagination={{
        current: pagination.page,
        pageSize: pagination.limit,
        total: pagination.total,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} profiles`,
        pageSizeOptions: ["10", "20", "50", "100"],
      }}
      expandable={{
        expandedRowRender: (record) => (
          <div
            style={{
              padding: 12,
            }}
          ></div>
        ),
      }}
    />
  );
};

export default GotraTable;
