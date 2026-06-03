import { IPagination, IUser } from "@/redux/types";

import { Button, Space, Table, Tag, Tooltip } from "antd";

import type { ColumnsType } from "antd/es/table";

interface iProps {
  loading: boolean;
  data: IUser[];
  pagination: IPagination;
  onPageChange: any;
}

const ProfileTable = (props: iProps) => {

  const { loading, data, pagination, onPageChange } = props;

  const columns: ColumnsType<IUser> = [{
    title: "#", key: "index",
    width: 70, fixed: "left", render: (_, __, index) => (pagination.page - 1) * pagination.limit + index + 1,
  },

  {
    title: "Name", dataIndex: "name", key: "name", width: 180, fixed: "left", render: (value, record) => (
      <Space direction="vertical" size={0}>
        <span>{value}</span>
        <Tag color={record.gender === "boy" ? "blue" : "magenta"}        >
          {record.gender?.toUpperCase()}
        </Tag>
      </Space>
    ),
  },

  {
    title: "Mobile",
    dataIndex: "mobile",
    key: "mobile",
    width: 140,
  },

  {
    title: "DOB",
    dataIndex: "dob",
    key: "dob",
    width: 120,
    render: (value) =>
      value
        ? new Date(
          value
        ).toLocaleDateString(
          "en-IN"
        )
        : "-",
  },

  {
    title: "Education",
    dataIndex: "education",
    key: "education",
    width: 180,
  },

  {
    title: "Occupation",
    dataIndex: "occupation",
    key: "occupation",
    width: 180,
  },

  {
    title: "Father",
    dataIndex:
      "fathersname",
    key: "fathersname",
    width: 180,
  },

  {
    title: "Mother",
    dataIndex:
      "mothersname",
    key: "mothersname",
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
    title: "Address",
    key: "address",
    width: 250,
    render: (_, record) => {
      const address = record?.address_details?.[0];
      if (!address)
        return "-";
      return (
        <Space
          direction="vertical"
          size={0}
        >
          <span>
            {
              address.address
            }
          </span>
          <small>
            {
              address.city
            }
            ,
            {" "}
            {
              address.state
            }
          </small>
        </Space>
      );
    },
  },

  {
    title: "Siblings",
    key: "siblings",
    width: 220,
    render: (_, record) => {
      if (
        !record
          ?.sibling_details
          ?.length
      ) {
        return "-";
      }
      return (
        <Space
          direction="vertical"
          size={2}
        >
          {record.sibling_details.map(
            (
              item,
              index
            ) => (
              <Tag
                key={
                  index
                }
              >
                {
                  item.relation
                }
                :
                {" "}
                {
                  item.name
                }
              </Tag>
            )
          )}
        </Space>
      );
    },
  },

  {
    title:
      "Other Gotra",
    key:
      "other_gotra",
    width: 220,
    render: (_, record) => {
      if (
        !record
          ?.other_gotra
          ?.length
      ) {
        return "-";
      }
      return (
        <Space
          direction="vertical"
          size={2}
        >
          {record.other_gotra.map(
            (
              item,
              index
            ) => (
              <Tag
                key={
                  index
                }
                color="purple"
              >
                {
                  item.other_gotra_relation
                }
                :
                {" "}
                {
                  item.other_gotra_name
                }
              </Tag>
            )
          )}
        </Space>
      );
    },
  },

  {
    title:
      "Preferences",
    dataIndex:
      "preferences",
    key:
      "preferences",
    width: 250,
    render: (
      value
    ) => {
      if (!value)
        return "-";
      return (
        <Tooltip
          title={
            value
          }
        >
          <span>
            {value.slice(
              0,
              40
            )}
            {value.length >
              40 &&
              "..."}
          </span>
        </Tooltip>
      );
    },
  },

  {
    title:
      "Created",
    dataIndex:
      "createdAt",
    key:
      "createdAt",
    width: 130,
    render: (
      value
    ) =>
      value
        ? new Date(
          value
        ).toLocaleDateString(
          "en-IN"
        )
        : "-",
  },

  {
    title:
      "Status",
    dataIndex:
      "isSuspended",
    key:
      "isSuspended",
    width: 120,
    fixed: "right",
    render: (
      value
    ) =>
      value ? (
        <Tag color="red">
          Suspended
        </Tag>
      ) : (
        <Tag color="green">
          Active
        </Tag>
      ),
  },

  {
    title:
      "Action",
    key:
      "action",
    width: 160,
    fixed: "right",
    render: (
      _,
      record
    ) => (
      <Space>
        <Button
          size="small"
          type="primary"
        >
          View
        </Button>
        <Button
          size="small"
        >
          Edit
        </Button>
      </Space>
    ),
  },
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
          <div
            style={{
              padding: 12,
            }}
          >
            {/* Parents */}
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <h4>
                Family Details
              </h4>
              <p>
                <b>
                  Father:
                </b>{" "}
                {
                  record.fathersname
                }
              </p>
              <p>
                <b>
                  Father Occupation:
                </b>{" "}
                {
                  record.fathersoccupation
                }
              </p>
              <p>
                <b>
                  Mother:
                </b>{" "}
                {
                  record.mothersname
                }
              </p>
              <p>
                <b>
                  Mother Occupation:
                </b>{" "}
                {
                  record.mothersoccupation
                }
              </p>
            </div>
            {/* Gotra */}
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <h4>
                Gotra Details
              </h4>
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
                  Grandmother:
                  {" "}
                  {
                    record.gm_gotra
                  }
                </Tag>
                <Tag>
                  Maternal GM:
                  {" "}
                  {
                    record.mat_gm_gotra
                  }
                </Tag>
              </Space>
            </div>
            {/* Address */}
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <h4>
                Address Details
              </h4>
              {record
                ?.address_details
                ?.length ? (
                record.address_details.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={
                        index
                      }
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      <p>
                        <b>
                          Address:
                        </b>{" "}
                        {
                          item.address
                        }
                      </p>
                      <p>
                        <b>
                          City:
                        </b>{" "}
                        {
                          item.city
                        }
                      </p>
                      <p>
                        <b>
                          State:
                        </b>{" "}
                        {
                          item.state
                        }
                      </p>

                      <p>
                        <b>
                          Pincode:
                        </b>{" "}
                        {
                          item.pincode
                        }
                      </p>
                    </div>
                  )
                )
              ) : (
                <p>
                  No Address
                </p>
              )}
            </div>

            {/* Siblings */}
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <h4>
                Sibling Details
              </h4>

              {record
                ?.sibling_details
                ?.length ? (
                record.sibling_details.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={
                        index
                      }
                    >
                      <Tag color="blue">
                        {
                          item.relation
                        }
                      </Tag>

                      {item.name}
                      {" - "}
                      {
                        item.education
                      }
                      {" - "}
                      {
                        item.occupation
                      }
                    </div>
                  )
                )
              ) : (
                <p>
                  No Siblings
                </p>
              )}
            </div>

            {/* Other Gotra */}
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <h4>
                Other Gotra
              </h4>

              {record
                ?.other_gotra
                ?.length ? (
                record.other_gotra.map(
                  (
                    item,
                    index
                  ) => (
                    <Tag
                      key={
                        index
                      }
                      color="purple"
                    >
                      {
                        item.other_gotra_relation
                      }
                      :
                      {" "}
                      {
                        item.other_gotra_name
                      }
                    </Tag>
                  )
                )
              ) : (
                <p>
                  No Other Gotra
                </p>
              )}
            </div>

            {/* Preferences */}
            <div>
              <h4>
                Preferences
              </h4>

              <p>
                {
                  record.preferences ||
                  "-"
                }
              </p>

              <h4>
                Other Info
              </h4>

              <p>
                {
                  record.otherinfo ||
                  "-"
                }
              </p>
            </div>
          </div>
        ),
      }}
    />
  );
};

export default ProfileTable;