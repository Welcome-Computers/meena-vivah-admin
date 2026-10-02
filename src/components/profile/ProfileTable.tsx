import { STATUS_TYPES } from "@/lib/modules/admin/admin.types";
import { statusOptions } from "@/lib/utility/constant";
import { cmToFeetInch, displayDob, getAge } from "@/lib/utility/helper";
import { appMessage } from "@/lib/utility/message";
import { setProfileData } from "@/redux/features/profile";
import { useDeleteUserMutation } from "@/redux/features/profile/srevices";
import { IProfile } from "@/redux/features/profile/types";
import { IPagination } from "@/redux/features/shared/types";
import { useAppDispatch } from "@/redux/hooks";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Checkbox, Form, Modal, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import ProfileData from "./ProfileData";

interface iProps {
  loading: boolean;
  showAction?: boolean;
  data: IProfile[];
  pagination?: IPagination;
  handleGetProfiles?: ({ page, pageSize, status }: {
    page?: number;
    pageSize?: number | undefined;
    status?: STATUS_TYPES[] | undefined;
  }) => void;
  is_pick_current_data?: boolean;
  callingFrom?: string;
  contentHeight?: number;
}

const ProfileTable = (props: iProps) => {

  const { callingFrom, showAction, loading, data = [], pagination, handleGetProfiles,
    is_pick_current_data = false,
    contentHeight = 200,
  } = props;

  const [deleteUserAction, { isLoading: isLoadingDeleteUser }] = useDeleteUserMutation();

  const form = Form.useFormInstance()

  const router = useRouter();
  const dispatch = useAppDispatch() as any;



  const deleteProfile = useCallback((recordId: any) => {

    Modal.confirm({
      centered: true,
      title: "Delete biodata?",
      content: "Are you sure you want to remove this record?",
      okText: "Delete",
      okType: "danger",
      async onOk() {
        try {
          const res = await deleteUserAction(recordId).unwrap();
          if (res.success) {
            appMessage.success(res.message || "Profile deleted successfully");
          } else {
            appMessage.error(res.message || "Profile not deleted successfully");
          }
        } catch (error: any) {
          appMessage.error(error?.message || error?.data?.message || "Failed to delete profile");
        }
      },
    });
  },
    [appMessage]
  );

  const columns: ColumnsType<IProfile> = [{
    title: "#", key: "index",
    width: 70, fixed: "left",
    render: (_, __, index) => {
      if (!pagination) {
        return index + 1;
      }
      return (pagination.page - 1) * pagination.limit + index + 1;
    },
  },

  {
    title: "Name", dataIndex: "name", key: "name", width: 220, fixed: "left", render: (value, record) => {
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
                    {`${record?.occupation_name}`}
                  </em>)
                </small>
              </Space>
            </div>
            <Space
              orientation="horizontal"
              size={0}>
              <Tag color={"black"}>
                {getAge({ dob: record.dob })}
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
      return displayDob(value)
    }
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 120,

    filterMultiple: true,

    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8, width: 200 }}>
        <div style={{ marginBottom: 12 }}>
          <Checkbox.Group
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
            options={statusOptions}
            value={selectedKeys as STATUS_TYPES[]}
            onChange={(values) => {
              setSelectedKeys(values);
            }}
          />
        </div>

        <Space style={{
          width: "100%",
          justifyContent: "flex-end",
        }}>
          <Button
            type="primary"
            size="small"
            onClick={() => confirm()}
          >
            OK
          </Button>

          <Button
            size="small"
            onClick={() => {
              clearFilters?.();
              confirm();
            }}
          >
            Reset
          </Button>
        </Space>
      </div >
    ),
  },

  {
    title: "Height",
    dataIndex: "height",
    key: "height",
    width: 80,
    render: (value) => {
      const { feet, inches } = cmToFeetInch(value);

      if (
        feet === null ||
        inches === null
      ) {
        return "--";
      }

      return (
        <span>
          {feet}.{inches}
        </span>
      );
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
        <Tag color={"red"}>
          <span style={{ color: "black" }}>Self: </span>{record.self_gotra_name}
        </Tag>
        <Tag color={"red"}>
          <span style={{ color: "black" }}>Mother: </span>{record.m_gotra_name}
        </Tag>
        <Tag color={"red"}>
          <span style={{ color: "black" }}>G.Mother: </span>{record.gm_gotra_name}
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
      if (!value && !record?.fathersoccupation) {
        return null;
      }

      return (
        <Space orientation="horizontal" size={0}>
          <Space
            orientation="vertical"
            size={0}
            style={{ marginLeft: "10px" }}
          >
            <small>
              {value || "--"}

              {record?.fathersoccupation && (
                <em>{` ${record.fathersoccupation}`}</em>
              )}
            </small>
          </Space>
        </Space>
      );
    }
  },

  {
    title: "Mother",
    dataIndex: "mothersname",
    key: "mothersname",
    width: 180,
    render: (value, record) => {
      if (!value && !record?.mothersoccupation) {
        return null;
      }

      return (
        <Space orientation="horizontal" size={0}>
          <Space
            orientation="vertical"
            size={0}
            style={{ marginLeft: "10px" }}
          >
            <small>
              {value || "--"}

              {record?.mothersoccupation && (
                <em>{` ${record.mothersoccupation}`}</em>
              )}
            </small>
          </Space>
        </Space>
      );
    }
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
        width: 160,
        fixed: "right" as const,
        render: (_: any, record: any) => (
          <Space>
            <Button
              type="primary"
              shape="circle"
              onClick={() => {
                if (is_pick_current_data) {
                  const values = form?.getFieldsValue?.() || {};
                  const details = callingFrom === "create" ? values?.otherinfo : values?.old_detials;
                  dispatch(setProfileData(details));
                }
                router.push(
                  `/dashboard/profiles/update_profile?id=${record.id}&action=update`
                );
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              type="primary"
              danger
              shape="circle"
              onClick={() => deleteProfile(record.id)}>
              <DeleteOutlined />
            </Button>
          </Space>
        ),
      },
    ]
    : [])

  ];



  const handleTableChange = (
    tablePagination: any,
    filters: Record<string, any>
  ) => {
    const status = filters.status as STATUS_TYPES[];

    handleGetProfiles?.({
      page: tablePagination.current,
      pageSize: tablePagination.pageSize,
      status,
    });
  };

  const scrollProps = {
    x: 1200,
    y: Math.max(contentHeight - 130, 200),
  };

  // console.log(pagination)

  return (
    <Table
      rowKey="id"
      bordered
      size="small"
      loading={loading}
      dataSource={data}
      columns={columns}
      onChange={handleTableChange}
      // onChange={(pagination, filters) => {
      //   const status = filters.status as STATUS_TYPES[];

      //   handleGetProfiles?.({
      //     page: pagination.current,
      //     pageSize: pagination.pageSize,
      //     status,
      //   });
      // }}
      pagination={
        pagination
          ? {
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} profiles`,
            pageSizeOptions: ["10", "20", "50", "100"],
            onChange: (pageNo, pageSize) => {
              handleGetProfiles?.({
                page: pageNo,
                pageSize,
              });
            },
          }
          : false
      }
      scroll={scrollProps}
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