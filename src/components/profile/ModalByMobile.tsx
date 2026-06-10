import { Button, Modal, Table } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { memo } from "react";

interface iProps {
  title: string;
  isOpen: boolean;
  data: any[];
  hanldeClose: () => void;
}

const ModalByMobile = memo((props: iProps) => {
  const {
    title,
    isOpen,
    data = [],
    hanldeClose,
  } = props;

  const router = useRouter()

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      render: (value: string) =>
        dayjs(value).format("DD MMM YYYY"),
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          type="link"
          onClick={() => {
            hanldeClose();
            router.push(
              `/profiles/update_profile?id=${record.id}&action=update`
            );
          }}
        >
          Edit
        </Button>
      ),
    }
  ];

  return (
    <Modal
      open={isOpen}
      onCancel={hanldeClose}
      footer={null}
      title={title}
      width={800}
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={false}
        size="small"
      />
    </Modal>
  );
});

export default ModalByMobile;