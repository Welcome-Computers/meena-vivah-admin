import { Table } from "antd";
interface GenericTableProps {
  data: any[];
  loading: boolean;
  columns: any;
  pagination: any;
  handleSort: (sorter: any) => void;
}

export const GenericTable = (props: GenericTableProps) => {
  const { data, loading, columns, pagination, handleSort } = props;

  return (
    <>
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
