import { getAge } from "@/lib/utility";
import { IPagination, IUser } from "@/redux/types";

import { Avatar, Button, Space, Table, Tag } from "antd";

import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useRouter } from "next/router";
import ProfileData from "./ProfileData";

interface iProps {
  loading: boolean;
  showAction?: boolean;
  data: IUser[];
  pagination: IPagination;
  onPageChange: any;
}

const ProfileTable = (props: iProps) => {

  const { showAction, loading, data, pagination, onPageChange } = props;

  const router = useRouter();

  const columns: ColumnsType<IUser> = [{
    title: "#", key: "index",
    width: 70, fixed: "left", render: (_, __, index) => (pagination.page - 1) * pagination.limit + index + 1,
  },

  {
    title: "Name", dataIndex: "name", key: "name", width: 180, fixed: "left", render: (value, record) => {
      const imageSrc =
        record.gender === "boy"
          ? "/images/groom.jpg"
          : "/images/bride.jpg";
      return (
        <Space orientation="horizontal" size={0}>
          <Avatar size={50}
            icon={<Image src={imageSrc} alt={value}
              width={60}
              height={60}
            />} />
          <Space
            orientation="vertical"
            size={0}
            style={{ marginLeft: "10px" }}>
            <div style={{}}>
              {value}{"   "}
              <Space
                orientation="horizontal"
                size={0}>
                <small>
                  (<em color="blue">
                    {`${record?.occupation}`}
                  </em>)
                </small>
              </Space>
            </div>
            <Space
              orientation="horizontal"
              size={0}>
              <Tag color={"black"}>
                {getAge(record.dob)}
              </Tag>
            </Space>
          </Space>
        </Space>
      )
    },
  },


  {
    title: "DOB",
    dataIndex: "dob",
    key: "dob",
    width: 120,
    render: (value) => {
      return getAge(value)
    }
  },

  {
    title: "Education",
    dataIndex: "education",
    key: "education",
    width: 180,
  },

  {
    title: "Gotra",
    key: "gotra",
    width: 250,
    render: (_, record) => (
      <Space wrap>
        <Tag>
          Self:
          {" "}
          {
            record.self_gotra
          }
        </Tag>
        <Tag>
          Mother:
          {" "}
          {
            record.m_gotra
          }
        </Tag>
        <Tag>
          GM:
          {" "}
          {
            record.gm_gotra
          }
        </Tag>
      </Space>
    ),
  },

  {
    title: "Father",
    dataIndex:
      "fathersname",
    key: "fathersname",
    width: 180,
    render: (value, record) => {
      return (
        <Space orientation="horizontal" size={0}>
          <Space
            orientation="vertical"
            size={0}
            style={{ marginLeft: "10px" }}>
            <small>
              {value}

              <em color="blue">
                {` ${record?.fathersoccupation}`}
              </em>
            </small>
          </Space>
        </Space>
      )
    },

  },

  {
    title: "Mother",
    dataIndex: "mothersname",
    key: "mothersname",
    width: 180,
    render: (value, record) => {
      return (
        <Space orientation="horizontal" size={0}>
          <Space
            orientation="vertical"
            size={0}
            style={{ marginLeft: "10px" }}>
            <small>
              {value}

              <em color="blue">
                {` ${record?.mothersoccupation}`}
              </em>
            </small>
          </Space>
        </Space>
      )
    },
  },

  {
    title: "Address",
    key: "address",
    width: 250,
    render: (_, record) => {
      const address = record?.address_details?.[0];

      if (!address) return "-";

      return (
        <div>
          <div>{address.address}</div>

          <small
            style={{
              color: "#888",
            }}
          >
            {[address.city, address.state, address.pincode]
              .filter(Boolean)
              .join(", ")}
          </small>
        </div>
      );
    },
  },

  {
    title: "Mobile",
    dataIndex: "mobile",
    key: "mobile",
    width: 120,
    fixed: "right",
  },
  ...(showAction
    ? [
      {
        title: "Action",
        key: "action",
        width: 100,
        fixed: "right" as const,
        render: (_: any, record: any) => (
          <Space>
            <Button
              type="link"
              onClick={() => {
                router.push(
                  `/profiles/update_profile?id=${record.id}&action=update`
                );
              }}
            >
              Edit
            </Button>
          </Space>
        ),
      },
    ]
    : [])

  ];

  return (
    <Table
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
        pageSizeOptions: ["10", "20", "50", "100",],
        onChange: onPageChange,
      }}
      scroll={{ x: 1200 }}
      expandable={{
        expandedRowRender: (
          record
        ) => (
          <ProfileData record={record} />
        ),
      }}
    />
  );
};

export default ProfileTable;