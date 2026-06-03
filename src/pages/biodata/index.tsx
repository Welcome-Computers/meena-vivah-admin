import ModalComp from "@/components/common/ModalComp";
import AddressDetails from "@/components/formComponents/AddressDetails";
import FamilyDetails from "@/components/formComponents/FamilyDetails";
import GotraDetials from "@/components/formComponents/GotraDetails";
import MobileDetails from "@/components/formComponents/MobileDetails";
import OtherDetails from "@/components/formComponents/OtherDetails";
import PersonalDetails from "@/components/formComponents/PersonalDetails";
import SiblingDetails from "@/components/formComponents/SiblingDetails";
import { removeEmptyObjects } from "@/lib/utility";
import { appMessage } from "@/lib/utility/message";
import { Button, Col, Form, Row } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";

const Biodata = () => {
  const [form] = Form.useForm();

  const [isPreviewOpen, setisPreviewOpen] = useState<boolean>(false);
  const [dataPreview, setDataPreview] = useState({});

  const handleFromSubmit1 = async () => {
    const { dob, ...rest } = form.getFieldsValue();

    const formattedDob = dob
      ? `${dob.year}-${String(dob.month).padStart(2, '0')}-${String(dob.day).padStart(2, '0')}`
      : null;

    const formData = JSON.stringify({ ...rest, dob: formattedDob });

    console.log("form data ", formData);
    try {
      const res = await fetch("/api/userController", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData,
      });

      console.log(res.json);
    } catch (error) {
      console.log("err data", error);
    }
  };

  const handleFromSubmit = async () => {

    const { dob, ...rest } = form.getFieldsValue();

    const formattedDob = dob
      ? dayjs(
        new Date(dob.year, dob.month, dob.day)
      ).format("YYYY-MM-DD")
      : null;

    const formData = {
      ...rest,
      dob: formattedDob,

      sibling_details: removeEmptyObjects(rest.sibling_details),
      other_gotra: removeEmptyObjects(rest.other_gotra),
      mobile_details: removeEmptyObjects(rest.mobile_details),
      address_details: removeEmptyObjects(rest.address_details),
    };

    // console.log("form data", formData);
    try {
      const res: any = await axios.post("http://localhost:3005/api/user", formData);

      if (res.data.success) {
        appMessage.success("Profile created successfully");
      } else {
        appMessage.error(
          res.data.message || "Profile not created"
        );
      }
    } catch (error: any) {
      appMessage.error(
        error?.response?.data?.message || "Something went wrong"
      );
      // console.log("err data", error);
    }
  };

  const handlePreviewButton = () => {
    const previewData = form.getFieldsValue();
    setDataPreview(previewData);
    setisPreviewOpen(true);
  };

  const hanldeClosePreview = () => {
    setisPreviewOpen(false);
  };

  return (
    <AdminLayout>
      {/* Main form components */}
      <Form
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        form={form}
        onFinish={handleFromSubmit}
        initialValues={{
          sibling_details: [{}],
          mobile_details: [{}],
          other_gotra: [{}],
          address_details: [{}],
        }}
      >
        <Row gutter={[40, 40]}>
          <Col xs={24} md={12}>
            <PersonalDetails form={form} />
            <FamilyDetails form={form} />
            <SiblingDetails form={form} />
          </Col>

          <Col xs={24} md={12}>
            <GotraDetials form={form} />
            <MobileDetails form={form} />
            <AddressDetails form={form} />
            <OtherDetails />
          </Col>
        </Row>

        {/* AT LAST IN RIGHT BOTTOM */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          marginTop: "20px"
        }}
        >

          <Button type="primary" onClick={handlePreviewButton}>
            Preview
          </Button>

          <Button type="primary" htmlType="submit">
            Confrom
          </Button>

        </div>

      </Form>

      <ModalComp
        title={"Preview Biodata"}
        isOpen={isPreviewOpen}
        data={dataPreview}
        hanldeClose={hanldeClosePreview}
      />

    </AdminLayout>
  );
};

export default Biodata;
