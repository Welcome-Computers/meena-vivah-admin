"use client";

import {
  CopyOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Pagination,
  Row,
  Space,
  Table
} from "antd";

import { formattedDob } from "@/lib/utility/helper";
import { appMessage } from "@/lib/utility/message";
import { useDeleteImportedProfileMutation, useMoveImportedProfileMutation } from "@/redux/features/importedProfile/srevices";
import { useGetGotrasQuery } from "@/redux/features/masterGotra";
import { EditableProfile } from "@/redux/types";
import { RuleObject } from "antd/es/form";
import {
  Dispatch,
  SetStateAction,
  useState
} from "react";
import GotraDetials from "../formComponents/GotraDetails";
import OtherDetails from "../formComponents/OtherDetails";
import CheckBoxField from "../InputElements/CheckBoxField";
import DobField from "../InputElements/DobField";
import InputField from "../InputElements/InputField";

interface Props {
  profiles: any[];
  setProfiles: Dispatch<SetStateAction<EditableProfile[]>>;
  handleFromSubmit: (type: "draft" | "permanent") => Promise<void>;
  refetchProfiles: () => Promise<void>
}

const BiodataPreviewTable = ({
  profiles,
  setProfiles,
  handleFromSubmit,
  refetchProfiles
}: Props) => {

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: profiles.length, // or API total
  });

  const { data, isFetching, refetch } = useGetGotrasQuery({});
  const [deleteImportedProfile, { data: deletedData, isLoading, }] = useDeleteImportedProfileMutation();
  const [moveImportedProfile, { isLoading: isLoadingCreateUser }] = useMoveImportedProfileMutation();

  const getGotraName = (recordCode: string) => {
    if (recordCode) {
      return data.find((item: any) => item.code === recordCode).name
    }
  }

  const editableRender = (field: string) => (value: string, record: any) => {
    const error = record?.errors?.find((e: any) => e.field === field)?.message;

    if (field === "dob" && value) {
      const formattedValue = formattedDob(value);
      return (
        <div>
          {formattedValue}
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

  const htmlRender = (
    value: string
  ) => (
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

  const deleteRow = (record: any) => {
    const hasTempId = record?.temp_id;
    const hasId = record?.id;

    Modal.confirm({
      centered: true,
      title: "Delete biodata?",
      content: "Are you sure you want to remove this record?",
      okText: "Delete",
      okType: "danger",
      async onOk() {


        if (hasTempId) {
          setProfiles(prev =>
            prev.filter(
              x => String(x.temp_id) !== String(hasTempId)
            )
          );
        } else if (hasId) {
          const res = await deleteImportedProfile(hasId).unwrap();
          if (res.success) {
            appMessage.success(res.message || "Profile deleted successfully");
            refetchProfiles()
          }
        } else {
          appMessage.error("Profile Id or Temp Id not found");
        }
      },
    });
  };

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
      width: 100,

      render: (_: any, record: any) => (
        <Space>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              deleteRow(record)
            }}
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

  const moveSingleImportedRow = async (record: any) => {
    // call RTK mutation here

    // console.log(record)
    // return;
    // debugger;
    const { dob, ...rest } = record || {};
    const formattedDobValue = formattedDob(dob);
    const profileData = {
      ...rest,
      dob: formattedDobValue,
    };

    const res = await moveImportedProfile(profileData).unwrap()

    if (res.success) {
      appMessage.success("Profile created successfully");
      refetchProfiles()
      // setProfiles(prev =>
      //   prev.map(item =>
      //     item?.id === record?.id
      //       ? record
      //       : item
      //   )
      // );
    } else {
      appMessage.error(res.message || "Profile not created");
    }

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
    form.resetFields();
    setExpandedId(null);
  };

  const expandedRowRender = () => {
    return (
      <Space orientation="vertical" style={{ width: "100%" }}>
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
          form={form}
          onFinish={handleFormSubmit}
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item hidden name="id">
                <Input />
              </Form.Item>

              <OtherDetails callingFrom={'update'} />
            </Col>
            <Col span={12}>
              <CheckBoxField
                form={form}
                name="gender"
                label="Gender"
                rules={[{ required: true, message: "Select Gender First" }]}
                options={[
                  { option: "Boy", value: "boy" },
                  { option: "Girl", value: "girl" },
                ]}
              />

              <InputField
                name="name"
                label="Name"
                rules={[
                  { required: true, message: "Enter first name " },
                  { max: 100, message: "Maximum 100 characters" },
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

              <DobField
                name="dob"
                label="Date of Birth"
              />

              <InputField
                name="fathersname"
                label="Father Name"
                rules={[
                  { max: 30, message: "Maximum 30 characters" },
                ]}
              />

              <GotraDetials
                showOtherGotra={false}
                showTitle={false}
                form={form} />

              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={async () => {
                    const values = await form.validateFields();
                    moveSingleImportedRow(values)
                  }}>
                  Move Imported
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>

      </Space >
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
          pageSizeOptions={["50", "100", "150", "200"]}
          showTotal={(total) => `Total ${total} profiles`}
          onChange={(page, pageSize) =>
            setPagination(prev => ({
              ...prev,
              page,
              limit: pageSize,
            }))
          }
        />
      </div>



    </div>
  );

}

export default BiodataPreviewTable;