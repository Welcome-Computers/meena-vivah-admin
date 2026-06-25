"use client";

import {
  CopyOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
} from "antd";

import { RuleObject } from "antd/es/form";
import {
  useEffect,
  useState,
} from "react";
import GotraDetials from "../formComponents/GotraDetails";
import InputField from "../InputElements/InputField";

interface Props {
  profiles: any[];
  handleFromSubmit: () => Promise<void>
}

const BiodataPreviewTable = ({
  profiles,
}: Props) => {

  const [data, setData] = useState<any[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: data.length, // or API total
  });

  useEffect(() => {
    setData(profiles);
  }, [profiles]);

  const updateField = (
    id: string,
    field: string,
    value: string
  ) => {

    setData(prev =>
      prev.map(item =>
        item.id === id
          ? {
            ...item,
            [field]: value,
          }
          : item
      )
    );
  };

  const editableRender = (
    field: string
  ) => (
    value: string,
    record: any
  ) => {

      const editable =
        selectedKeys.includes(
          record.id
        );


      if (!editable) {
        return (
          <div>
            {value}
          </div>
        );
      }


      return (
        <Input
          value={value || ""}
          onChange={(e) =>
            updateField(
              record.id,
              field,
              e.target.value
            )
          }
        />
      );

    };

  const deleteRow = (record: any) => {
    Modal.confirm({
      title: "Delete biodata?",
      content: "Are you sure you want to remove this record?",
      okText: "Delete",
      okType: "danger",

      onOk() {
        setData(prev =>
          prev.filter(
            x => String(x.id) !== String(record.id)
          )
        );

        setSelectedKeys(prev =>
          prev.filter(
            x => String(x) !== String(record.id)
          )
        );
      },
    });
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

  const htmlRender = (
    value: string
  ) => (
    <Space orientation="vertical" size={8}>
      <div
        style={{
          maxHeight: 200,
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
      title: "ID",
      width: 60,
      fixed: "left",
      dataIndex: "id",
    },
    {
      title: "+",
      width: 60,
      fixed: "left",

      render: () => null
    },
    {
      title: "Other Details",
      dataIndex: "otherinfo",
      fixed: "left",
      width: 500,
      render: htmlRender,
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
          {editableRender("self_gotra")(record.self_gotra, record)}

          {editableRender("m_gotra")(record.m_gotra, record)}

          {editableRender("gm_gotra")(record.gm_gotra, record)}
        </div>
      ),
    },
    {
      title: "Action",
      fixed: "right",
      width: 180,

      render: (_: any, record: any) => (
        <Space>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              deleteRow(record)
            }
          />
        </Space>
      )
    }


  ];

  const saveSingleRow = async (record: any) => {
    console.log(
      "saving single",
      record
    );
    // call RTK mutation here
    setData(prev =>
      prev.map(item =>
        item.id === record.id
          ? record
          : item
      )
    );

  };


  const handleFormSubmit = (
    values: any
  ) => {

    if (!expandedId) return;

    setData(prev =>
      prev.map(item =>
        item.id === expandedId
          ? {
            ...item,
            ...values,
          }
          : item
      )
    );

    setExpandedId(null);
  };

  const expandedRowRender = (record: any) => {
    return (
      <Space
        orientation="vertical"
        style={{
          width: "100%"
        }}
      >
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
          form={form}
          onFinish={handleFormSubmit}
        >
          <InputField
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Enter first name " },
              { max: 30, message: "Maximum 30 characters" },
            ]}
          />

          <InputField
            name="mobile"
            label="Mobile"
            placeholder="e.g. 9988771234"
            rules={[
              {
                validator: (_: RuleObject, val: any) => {

                  if (!val) {
                    return Promise.resolve();
                  }
                  if (val.length < 10) {
                    return Promise.reject(
                      new Error("Enter 10 Digit Mobile Number"),
                    );
                  }
                  if (!/^(\+91)?[6-9]\d{9}$/.test(val)) {
                    return Promise.reject(new Error("Check Mobile Number"));
                  }

                  return Promise.resolve();
                },
              },
              { required: "true", message: "Mobile number must be required" }
            ]}
          />

          <InputField
            name="fathersname"
            label="Father Name"
            rules={[
              { max: 30, message: "Maximum 30 characters" },
            ]}
          />

          <GotraDetials form={form} />

          <Space>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() =>
                saveSingleRow(record)
              }
            >
              Save
            </Button>
          </Space>
        </Form>

      </Space>
    );
  };

  const handleExpand = (
    expanded: boolean,
    record: any
  ) => {
    if (expanded) {
      setExpandedId(record.id);

      form.setFieldsValue({
        ...record,
      });
    } else {
      setExpandedId(null);
    }

  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {

        console.log(
          "final data",
          values.profiles
        );

      }}
    >
      <Form.List
        name="profiles"
      >

        {
          (fields) => {

            const tableData =
              fields.map(
                field => ({
                  ...field,
                  ...form.getFieldValue(
                    [
                      "profiles",
                      field.name
                    ]
                  )
                })
              );


            return (
              <Table
                rowKey="id"
                columns={columns}
                dataSource={data}
                expandable={{
                  expandedRowRender,
                  expandedRowKeys: expandedId ? [expandedId] : [],
                  onExpand: handleExpand,
                }}
                scroll={{
                  x: 2000,
                  y: 700,
                }}
                pagination={{
                  current: pagination.page,
                  pageSize: pagination.limit,
                  total: pagination.total,

                  showSizeChanger: true,

                  showTotal: (total) =>
                    `Total ${total} profiles`,

                  pageSizeOptions: [
                    "50",
                    "100",
                    "150",
                    "200",
                  ],

                  onChange: (page, pageSize) => {

                    setPagination(prev => ({
                      ...prev,
                      page,
                      limit: pageSize,
                    }));

                  },
                }}
              />
            );
          }
        }
      </Form.List>
      <Button
        type="primary"
        htmlType="submit"
      >
        Save All
      </Button>

    </Form>

  );

}

export default BiodataPreviewTable;