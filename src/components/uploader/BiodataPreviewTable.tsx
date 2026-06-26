"use client";

import {
  CopyOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import {
  Button,
  Form,
  Input,
  Space,
  Table
} from "antd";

import { ParsedProfile } from "@/redux/types";
import { RuleObject } from "antd/es/form";
import {
  Dispatch,
  SetStateAction,
  useState
} from "react";
import GotraDetials from "../formComponents/GotraDetails";
import InputField from "../InputElements/InputField";

interface Props {
  profiles: any[];
  setProfiles: Dispatch<SetStateAction<ParsedProfile[]>>;
  handleFromSubmit: (type: "draft" | "permanent") => Promise<void>
}

const BiodataPreviewTable = ({
  profiles,
  setProfiles,
  handleFromSubmit
}: Props) => {

  // const [data, setProfiles] = useState<any[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: profiles.length, // or API total
  });

  // useEffect(() => {
  //   setProfiles(profiles);
  // }, [profiles]);

  const updateField = (
    id: number,
    field: string,
    value: string
  ) => {

    setProfiles(prev =>
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
      title: "Action",
      fixed: "right",
      width: 180,

      render: (_: any, record: any) => (
        <Space>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              // deleteRow(record)
              setProfiles(prev =>
                prev.filter(
                  x => String(x.id) !== String(record.id)
                )
              );

              setSelectedKeys(prev =>
                prev.filter(
                  x => String(x) !== String(record.id)
                )
              );
            }}
          />
        </Space>
      )
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


  ];

  const saveSingleRow = async (record: any) => {
    console.log(
      "saving single",
      record
    );
    // call RTK mutation here
    setProfiles(prev =>
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

    setProfiles(prev =>
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
    <div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={profiles}
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

      <Space
        style={{
          width: "100%",
          justifyContent: "flex-end",
        }}
        size={20}
      >
        <Button
          type="primary"
          htmlType="button"
          onClick={() => handleFromSubmit("draft")}
        >
          Save Draft
        </Button>
        <Button
          danger
          type="primary"
          htmlType="button"
          onClick={() => handleFromSubmit("permanent")}
        >
          Save Permanent
        </Button>
      </Space>
    </div>
  );

}

export default BiodataPreviewTable;