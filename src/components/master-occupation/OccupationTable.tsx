import { Button, Popconfirm, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GenericTable } from "../common/GenericTable";

export type IOccupation = {
  id?: number;
  name?: string;
  code?: string;
};
interface iProps {
  handleDelete: any;
  handleEdit: any;
  handleSort: any;
  isLoading: any;
  pagination: any;
  data: any;
}

const OccupationTable = (props: iProps) => {
  const { handleDelete, handleEdit, handleSort, isLoading, pagination, data } =
    props;

  const columns: ColumnsType<IOccupation> = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 70,
      fixed: "left",
      sorter: true,
    },

    {
      title: "Occupation Name",
      dataIndex: "name",
      key: "name",
      width: 180,
      fixed: "left",
      sorter: true,
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
            <Button
              danger
              size="small"
              type="primary">
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

export default OccupationTable;
