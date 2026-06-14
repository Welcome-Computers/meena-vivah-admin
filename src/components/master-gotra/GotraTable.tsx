import { IPagination, IGotra } from "@/redux/types";

import { Button, Popconfirm, Select, Space, Table } from "antd";

import type { ColumnsType } from "antd/es/table";
import Text from "antd/es/typography/Text";
import { useState } from "react";

interface iProps {
  loading: boolean;
  data: IGotra[];
  pagination: IPagination;
  handleDelete: any;
  handleEdit: any;
}

const GotraTable = (props: iProps) => {
  const { loading, data, pagination, handleDelete, handleEdit } = props;

  const [selectedGotra, setSelectedGotra] = useState("");

  console.log("GotraTable data:", data);


  const filterData=selectedGotra? data.filter((item)=>item.name === selectedGotra) :data;

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
      <Space direction="vertical" size={4} style={{ marginBottom: "1rem" }}>
        <Text strong>Search Gotra</Text>
        <Select
          style={{ width: "500px" }}
          allowClear
          showSearch
          onChange={(value) => setSelectedGotra(value)}
          options={data.map((item) => ({ value: item.name }))}
        />
      </Space>

      <Table
        rowKey="id"
        bordered
        size="small"
        loading={loading}
        // dataSource={data}
        dataSource={filterData}
        columns={columns}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} profiles`,
          pageSizeOptions: ["50", "100", "150", "200"],
        }}
      />
    </>
  );
};

export default GotraTable;
