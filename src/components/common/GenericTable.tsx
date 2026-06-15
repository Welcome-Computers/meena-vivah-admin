import {  Select, Space, Table } from "antd";
import Text from "antd/es/typography/Text";
import { useState } from "react";

interface GenericTableProps {
  data: any[];
  loading: boolean;
  columns: any;
  pagination: any;
}

export const GenericTable = (props: GenericTableProps) => {
  const { data, loading, columns, pagination } = props;

  const [selectedValue,setSelectedValue ] = useState("");

//   console.log("GotraTable data:", data);

  const filterData = selectedValue
    ? data.filter((item) => item.name === selectedValue)
    : data;

  return (
    <>
      <Space direction="vertical" size={4} style={{ marginBottom: "1rem" }}>
        <Text strong>Search Gotra</Text>
        <Select
          style={{ width: "500px" }}
          allowClear
          showSearch
          onChange={(value) => setSelectedValue(value)}
          options={data.map((item) => ({ value: item.name }))}
        />
      </Space>

      <Table
        rowKey="id"
        bordered
        size="small"
        loading={loading}
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
