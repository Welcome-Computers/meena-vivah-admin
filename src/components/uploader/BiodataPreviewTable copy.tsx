"use client";

import {
  CopyOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import {
  Button,
  Form,
  Input,
  Space,
  Table,
} from "antd";

import { useEffect } from "react";

import GotraDetials from "../formComponents/GotraDetails";
import InputField from "../InputElements/InputField";


interface Props {
  profiles: any[];
  handleFromSubmit: () => Promise<void>;
}


export default function BiodataPreviewTable({
  profiles,
}: Props) {

  const [form] = Form.useForm();


  useEffect(() => {
    form.setFieldsValue({
      profiles,
    });
  }, [profiles]);


  const copyHtml = async (
    html: string
  ) => {

    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob(
          [html],
          {
            type: "text/html",
          }
        ),

        "text/plain": new Blob(
          [
            html.replace(
              /<[^>]+>/g,
              ""
            ),
          ],
          {
            type: "text/plain",
          }
        ),
      }),
    ]);
  };


  const htmlRender = (
    html: string
  ) => (
    <Space direction="vertical">
      <div
        style={{
          maxHeight: 200,
          overflow: "auto",
        }}
        dangerouslySetInnerHTML={{
          __html: html || "",
        }}
      />

      <Button
        size="small"
        icon={<CopyOutlined />}
        onClick={() =>
          copyHtml(html)
        }
      >
        Copy
      </Button>
    </Space>
  );


  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      fixed: "left",
      render: (
        _: any,
        record: any
      ) => record.id,
    },


    {
      title: "Other Details",
      dataIndex: "otherinfo",
      width: 500,
      render: htmlRender,
    },


    {
      title: "Name",
      dataIndex: "name",
      width: 200,
      render: (
        _: any,
        record: any
      ) => (
        <Form.Item
          name={[
            "profiles",
            record.index,
            "name",
          ]}
          noStyle
        >
          <Input />
        </Form.Item>
      ),
    },


    {
      title: "Mobile",
      width: 180,
      render: (
        _: any,
        record: any
      ) => (
        <Form.Item
          name={[
            "profiles",
            record.index,
            "mobile",
          ]}
          noStyle
        >
          <Input />
        </Form.Item>
      ),
    },


    {
      title: "Father Name",
      width: 200,
      render: (
        _: any,
        record: any
      ) => (
        <Form.Item
          name={[
            "profiles",
            record.index,
            "fathersname",
          ]}
          noStyle
        >
          <Input />
        </Form.Item>
      ),
    },


    {
      title: "Action",

      render: (
        _: any,
        record: any
      ) => (
        <Form.List
          name="profiles"
        >
          {
            (fields, { remove }) => (
              <Button
                danger
                icon={
                  <DeleteOutlined />
                }
                onClick={() =>
                  remove(record.index)
                }
              />
            )
          }
        </Form.List>
      )
    }
  ];



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
                dataSource={tableData}


                expandable={{

                  expandedRowRender:
                    (record: any) => (

                      <Form.Item
                        noStyle
                      >

                        <InputField
                          name={[
                            record.index,
                            "name"
                          ]}
                          label="Name"
                        />


                        <InputField
                          name={[
                            record.index,
                            "mobile"
                          ]}
                          label="Mobile"
                        />


                        <GotraDetials
                          form={form}
                          index={record.index}
                        />

                      </Form.Item>

                    ),


                }}


                scroll={{
                  x: 2000,
                  y: 700
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