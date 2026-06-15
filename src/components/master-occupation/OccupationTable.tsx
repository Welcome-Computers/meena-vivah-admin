import { IPagination, IOccupation } from "@/redux/types";
import { Button, Popconfirm,  Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GenericTable } from "../common/GenericTable";

interface iProps {
  loading: boolean;
  data: IOccupation[];
  pagination: IPagination;
  handleDelete: any;
  handleEdit: any;
}

const OccupationTable = (props: iProps) => {
  const { loading, data, pagination ,handleDelete ,handleEdit} = props;


  const columns: ColumnsType<IOccupation> = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 70,
      fixed: "left",
      sorter: (a, b) => (a.code ?? "").localeCompare(b.code ?? ""),
    },

    {
      title: "Occupation Name",
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
            title="Delet Occupation"
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
    loading={loading}
     data={data}
    pagination={pagination}
    columns={columns}
    />
     
    </>
  );
};

export default OccupationTable;




