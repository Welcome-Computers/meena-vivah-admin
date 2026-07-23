"use client";

import {
  CopyOutlined,
  DeleteOutlined,
  EditFilled,
} from "@ant-design/icons";

import {
  Button,
  Pagination,
  Space,
  Table
} from "antd";

import { useGetGotrasQuery } from "@/redux/features/masterGotra";
import { IPagination } from "@/redux/features/shared/types";
import dayjs from "dayjs";

interface Props {
  profiles: any[];
  handleFromSubmit: (type: "draft" | "permanent") => Promise<void>;
  setPagination: any;
  pagination: IPagination;
  handleEdit: (record: any, operation: boolean) => void;
  deleteProfile: (record: any, callingFrom: "table" | "form") => void;
}

const BiodataPreviewTable = ({
  profiles,
  handleFromSubmit,
  setPagination,
  pagination,
  handleEdit,
  deleteProfile
}: Props) => {

  // const [expandedId, setExpandedId] = useState<number | null>(null);


  const { data: gotraData, isFetching, refetch } = useGetGotrasQuery({});

  // console.log(profiles)

  const getGotraName = (recordCode: string) => {
    if (recordCode) {
      return gotraData.find((item: any) => item.code === recordCode).name
    }
  }

  const editableRender = (field: string) => (value: string, record: any) => {
    const error = record?.errors?.find((e: any) => e.field === field)?.message;

    if (field === "dob" && value) {
      return (
        <div>
          {dayjs(value).format("YYYY-MMM-DD")}
          {error && (
            <div style={{ color: "red" }}>
              {error}
            </div>
          )}
        </div>
      );

    } else {

      return (
        <div>
          {value}
          {error && (
            <div style={{ color: "red" }}>
              {error}
            </div>
          )}
        </div>
      );
    }

  };

  const copyHtml = async (
    html: string
  ) => {

    await navigator.clipboard.write([
      new ClipboardItem({

        "text/html":
          new Blob(
            [html],
            {
              type: "text/html"
            }
          ),

        "text/plain":
          new Blob(
            [
              html.replace(
                /<[^>]+>/g,
                ""
              )
            ],
            {
              type: "text/plain"
            }
          )

      })
    ]);
  };

  const htmlRender = (value: string) => (
    <Space orientation="vertical" size={8}>
      <div
        style={{
          maxHeight: 300,
          overflow: "auto"
        }}
        dangerouslySetInnerHTML={{
          __html: value || ""
        }}
      />
      <Button
        icon={<CopyOutlined />}
        onClick={() =>
          copyHtml(value || "")
        }
        size="small"
      >
        Copy
      </Button>
    </Space>
  );



  const columns: any[] = [
    {
      title: "#",
      key: "index",
      width: 60,
      fixed: "left",
      align: "center",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Other Details",
      dataIndex: "otherinfo",
      fixed: "left",
      width: 300,
      render: htmlRender,
    },

    {
      title: "Action",
      fixed: "right",
      width: 150,

      render: (_: any, record: any) => (
        <Space>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteProfile(record, "table")}
          />
          <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => handleEdit(record, true)}
          />
        </Space>
      )
    },

    {
      title: "Gender",
      dataIndex: "gender",
      width: 180,
      render: editableRender("gender"),
    },

    {
      title: "Name",
      dataIndex: "name",
      width: 180,
      render: editableRender("name"),
    },


    {
      title: "DOB",
      dataIndex: "dob",
      width: 150,
      render: editableRender("dob"),
    },


    {
      title: "Mobile",
      dataIndex: "mobile",
      width: 160,
      render: editableRender("mobile"),
    },

    {
      title: "Father Name",
      dataIndex: "fathersname",
      width: 220,
      render: editableRender("fathersname"),
    },

    {
      title: "Gotra Details",
      width: 250,
      render: (_: any, record: any) => (
        <div>
          {editableRender("self_gotra")(getGotraName(record.self_gotra), record)}
          {editableRender("m_gotra")(getGotraName(record.m_gotra), record)}
          {editableRender("gm_gotra")(getGotraName(record.gm_gotra), record)}
        </div>
      ),
    },


  ];

  const handlePaginationChange = (
    page: number,
    pageSize: number
  ) => {
    setPagination((prev: IPagination) => ({
      ...prev,
      page,
      limit: pageSize,
    }));
  };

  return (
    <div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={profiles}

        scroll={{
          x: 1600,
          y: 800,
        }}
        pagination={false}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <Space>
          <Button
            type="primary"
            onClick={() => handleFromSubmit("draft")}
          >
            Save Draft
          </Button>

          <Button
            danger
            type="primary"
            onClick={() => handleFromSubmit("permanent")}
          >
            Save Permanent
          </Button>
        </Space>

        <Pagination
          current={pagination.page}
          pageSize={pagination.limit}
          total={pagination.total}
          showSizeChanger
          pageSizeOptions={["10", "20", "50", "100"]}
          showTotal={(total) => `Total ${total} profiles`}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );

}

export default BiodataPreviewTable;