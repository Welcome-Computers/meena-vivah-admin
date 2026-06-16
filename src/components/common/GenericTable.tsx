import { Button, Col, Form, Row, Space, Table } from "antd";
import Text from "antd/es/typography/Text";
import debounce from "lodash/debounce";
import { useMemo, useState } from "react";
import InputField from "../InputElements/InputField";

interface GenericTableProps {
  data: any[];
  loading: boolean;
  columns: any;
  pagination: any;
  handleSearch: (value: string) => void;
  handleSort: (sorter: any) => void;
  setSearch: (value: string) => void;
}

export const GenericTable = (props: GenericTableProps) => {
  const {
    data,
    loading,
    columns,
    pagination,
    handleSearch,
    handleSort,
    setSearch,
  } = props;
  const [inputValue, setInputValue] = useState<string>("");

  // debouncing funtion
  const debounceSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
      }, 500),
    [setSearch],
  );

  // handle Onchnage State
  const handleInputChange = (v: string) => {
    setInputValue(v);
    if (!v) {
      debounceSearch("");
      return;
    }

    if (v.length < 3) {
      return;
    }
    debounceSearch(v);
  };

  return (
    <>
      <Form>
        <Space direction="vertical" size={4} style={{ marginBottom: "1rem" }}>
          <Text strong>Search Gotra</Text>
          <Row>
            <Col>
              <InputField
                style={{ height: "1.5rem" }}
                name="Search"
                label={null}
                onChange={(v) => handleInputChange(v.target.value)}
                rules={[
                  {
                    validator: (_: any, value: string) => {
                      if (!value || value.length >= 3) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Minimum 3 Character required"),
                      );
                    },
                  },
                ]}
              />
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={() => handleSearch(inputValue)}
                style={{ height: "1.5rem", margin: ".2rem" }}
              >
                Go
              </Button>
            </Col>
          </Row>
        </Space>
      </Form>

      <Table
        onChange={(pagination, filters, sorter) => {
          handleSort(sorter);
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
