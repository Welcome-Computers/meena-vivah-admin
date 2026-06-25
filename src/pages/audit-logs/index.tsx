import SearchField from "@/components/InputElements/SearchField";
import AdminLayout from "@/components/layout/AdminLayout";
import { useGetAuditLogsQuery } from "@/redux/features/auditLogs";
import { Table, Button, Form, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { debounce } from "lodash";
import { useMemo, useState } from "react";


interface AuditLog {
  id: number;
//   adminId:number;
  adminName: string;
  action: string;
  module: string;
  recordId: number;
  oldData: string;
  newData: string;
  createdAt: string;
  role: string;
  isActive: boolean;
}


const AuditLogs = () => {
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // serching state
  const [inputValue, setInputValue] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  // fitler states
  const [moduleFilter, setModuleFilter] = useState<string>("");
  const [actionFilter, setActionFilter] = useState<string>("");

  const [form] = Form.useForm();

  //  get audit history
  const { data, isLoading, error } = useGetAuditLogsQuery({
    page,
    limit: 10,
    ...(search && { search }),
    ...(sortField && { sortField }),
    ...(sortOrder && { sortOrder }),
    ...(moduleFilter && {  moduleFilter }),
    ...(actionFilter && {  actionFilter }),
  });

  const auditList = data || [];
  const pagination = data?.pagination || {};

  //    SEARCHING PART
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

  // trigger search
  const onSubmit = () => {
    if (inputValue.length < 3) {
      return;
    }
    setSearch(inputValue);
  };

  // SORTING PART
  const handleSort = (sorter: any) => {
    setSortField(sorter.field || "");
    setSortOrder(sorter.order || "");
  };

  const columns: ColumnsType<AuditLog> = [
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      fixed: "left",
      sorter: (a, b) => (a.createdAt ?? "").localeCompare(b.createdAt ?? ""),
    },
    {
      title: "Admin",
      dataIndex: "adminName",
      key: "adminName",
      width: 80,
      fixed: "left",
    },
    {
      title: "Module",
      dataIndex: "module",
      key: "module",
      width: 90,
      fixed: "left",
      filters: [
        { text: "Gotra", value: "gotra" },
      ],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 90,
      fixed: "left",
      filters: [
        { text: "CREATE", value: "CREATE" },
        { text: "UPDATE", value: "UPDATE" },
        { text: "DELETE", value: "DELETE" },
      ],
    },
    {
      title: "Record ID",
      dataIndex: "recordId",
      key: "recordId",
      width: 80,
    },
    {
      title: "Old Value",
      dataIndex: "oldData",
      key: "oldData",
      width: 220,
      ellipsis: true,
      render: (value: any) => JSON.stringify(value),
    },
    {
      title: "New Value",
      dataIndex: "newData",
      key: "newData",
      width: 220,
      ellipsis: true,
      render: (value: any) => JSON.stringify(value),
    },
  ];

  return (
    <AdminLayout>
      <Title level={5} style={{ marginBottom: 16 }}>
        Audit Logs
      </Title>

      {/* serach field */}
      <Form onFinish={onSubmit}>
        <SearchField
          handleInputChange={handleInputChange}
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
      </Form>

      {/* table */}
      <Table
        rowKey="id"
        bordered
        columns={columns}
        dataSource={auditList}
        scroll={{ x: 1200 }}
        onChange={(pagination, filters, sorter: any) => {
          handleSort(sorter);
          setModuleFilter((filters.module?.[0] as string) || "");
          setActionFilter((filters.action?.[0] as string) || "");
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <h4>Old Data</h4>
              <pre>
                {JSON.stringify(
                  typeof record.oldData === "string"
                    ? JSON.parse(record.oldData)
                    : record.oldData,
                  null,
                  2,
                )}
              </pre>

              <h4>New Data</h4>
              <pre>
                {" "}
                {JSON.stringify(
                  typeof record.newData === "string"
                    ? JSON.parse(record.newData)
                    : record.newData,
                  null,
                  2,
                )}
              </pre>
            </div>
          ),
        }}
      />
    </AdminLayout>
  );
};

export default AuditLogs;
