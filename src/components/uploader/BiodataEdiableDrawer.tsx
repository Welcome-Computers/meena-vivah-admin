"use client";


import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space
} from "antd";

import { appMessage } from "@/lib/utility/message";
import { useMoveImportedProfileMutation } from "@/redux/features/importedProfile/srevices";
import { FormInstance, RuleObject } from "antd/es/form";
import dayjs from "dayjs";
import GotraDetials from "../formComponents/GotraDetails";
import OtherDetails from "../formComponents/OtherDetails";
import CheckBoxField from "../InputElements/CheckBoxField";
import DobField from "../InputElements/DobField";
import InputField from "../InputElements/InputField";

interface Props {
  // setProfiles: Dispatch<SetStateAction<EditableProfile[]>>;
  drawerWidth: number;
  drawerOpen: boolean;
  editNavigation: {
    current: any;
    previous: any;
    next: any;
  }
  form: FormInstance;
  handleEdit: (record: any, operation: boolean) => void;
  deleteProfile: (record: any, callingFrom: "table" | "form") => void;
  isLoadingDeleteProfile: boolean
}

const BiodataEdiableDrawer = ({
  // setProfiles,
  drawerWidth,
  editNavigation,
  drawerOpen,
  form,
  handleEdit,
  deleteProfile,
  isLoadingDeleteProfile
}: Props) => {

  const [moveImportedProfile, { isLoading: isLoadingCreateUser }] = useMoveImportedProfileMutation();

  const moveSingleImportedRow = async (record: any) => {

    try {
      const { dob, ...rest } = record || {};

      const profileDob =
        dob?.year && dob?.month && dob?.day
          ? dayjs(
            `${dob.year}-${dob.month}-${dob.day}`,
            "YYYY-M-D"
          ).format("YYYY-MM-DD")
          : undefined;

      const params = {
        ...rest,
        ...(profileDob && { dob: profileDob }),
      };

      const res = await moveImportedProfile(params).unwrap();

      if (res.success) {
        appMessage.success("Profile created successfully");

        handleEdit(null, false);

        if (editNavigation?.next) {
          handleEdit(editNavigation.next, true);
        }
      }
    } catch (err: any) {
      console.error("++ ERRORS ++", err);

      const fieldErrors = err?.data?.errors?.fieldErrors;

      if (fieldErrors) {
        const firstError = Object.values(fieldErrors)
          .flat()[0] as string;

        appMessage.error(firstError);
        return;
      }

      appMessage.error(
        err?.data?.message || "Something went wrong"
      );
    }
  };

  // const handleFormSubmit = (values: any) => {
  //   if (!editNavigation?.current?.id) return;
  //   setProfiles(prev =>
  //     prev.map(item =>
  //       item.id === editNavigation?.current?.id
  //         ? {
  //           ...item,
  //           ...values,
  //         }
  //         : item
  //     )
  //   );
  //   form.resetFields();
  // };

  const ExpandedRow = ({ form }: any) => {
    return (
      <Space orientation="vertical" style={{ width: "100%" }}>
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
          form={form}
        // onFinish={handleFormSubmit}
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item hidden name="id"><Input /></Form.Item>
              <OtherDetails
                form={form}
                callingFrom={'update'} />
            </Col>
            <Col span={12}>
              <div style={{ height: "50px", width: "100%" }}></div>
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

            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={24}>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  danger
                  loading={isLoadingDeleteProfile}
                  iconPlacement="end"
                  htmlType="button"

                  onClick={async () => {
                    const values = await form.getFieldsValue();
                    deleteProfile(values, "form")
                  }}>
                  Delete
                </Button>

                <Button
                  type="primary"
                  loading={isLoadingCreateUser}
                  iconPlacement="end"
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

  return (
    <div>

      <Drawer
        title={`Edit Imported Profile [${editNavigation?.current?.id}]`}
        open={drawerOpen}
        size={`${drawerWidth}px`}
        closable={{
          placement: "end",
        }}
        onClose={() => handleEdit(null, false)}
        footer={
          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button
              type="primary"
              disabled={!editNavigation?.previous}
              onClick={() => handleEdit(editNavigation?.previous, true)}
            >Prev</Button>
            <Button
              type="primary"
              disabled={!editNavigation?.next}
              onClick={() => handleEdit(editNavigation?.next, true)}
            >Next</Button>
          </Space>
        }
        destroyOnHidden>
        <ExpandedRow form={form} />
      </Drawer>

    </div>
  );

}

export default BiodataEdiableDrawer;