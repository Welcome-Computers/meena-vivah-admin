import { Button, Col, Row, Space, Table } from "antd";
import Text from "antd/es/typography/Text";
import { useState } from "react";
import InputField from "../InputElements/InputField";

interface GenericTableProps {
  data: any[];
  loading: boolean;
  columns: any;
  pagination: any;
  handleSearch: any;
  handleSort: any;
}

export const GenericTable = (props: GenericTableProps) => {
  const { data, loading, columns, pagination, handleSearch, handleSort } = props;

  const [inputValue, setInputValue] = useState("");



  return (
    <>
      <Space orientation="vertical" size={4} style={{ marginBottom: "1rem" }}>
        <Text strong>Search Gotra</Text>
        <Row>
          <Col>
            <InputField
              style={{ height: "1.5rem" }}
              name="Search"
              label={null}
              onChange={(v) => setInputValue(v.target.value)}
            />
          </Col>
          <Col>
            <Button type="primary" onClick={() => handleSearch(inputValue)} style={{ height: "1.5rem", margin: ".2rem" }}>Go</Button>
          </Col>
        </Row>
      </Space>

      <Table
        onChange={(pagination, filters, sorter) => {
          handleSort(sorter)
        }}
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
          pageSizeOptions: ["50", "100", "150", "200"],
        }}
      />
    </>
  );
};
