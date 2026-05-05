import ActionButton from "@/components/formComponents/ActionButtons";
import AddressDetails from "@/components/formComponents/AddressDetails";
import FamilyDetails from "@/components/formComponents/FamilyDetails";
import GotraDetials from "@/components/formComponents/GotraDetails";
import MobileDetails from "@/components/formComponents/MobileDetails";
import OtherDetails from "@/components/formComponents/OtherDetails";
import PersonalDetails from "@/components/formComponents/PersonalDetails";
import SiblingDetails from "@/components/formComponents/SiblingDetails";
import { Button, Col, Form, Row } from "antd";
import AdminLayout from "../../components/layout/AdminLayout";

const Biodata = () => {
  const [form] = Form.useForm();

  const handleFromSubmit = async () => {
    const { dob, ...rest } = form.getFieldsValue();

    const formData = JSON.stringify({ ...rest, dob: dob.format("YYYY-MM-DD") });
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

  return (
    <AdminLayout>
      {/* button logout */}
      <Button
        type="primary"
        danger
        style={{ position: "absolute", top: 16, right: 16 }}
      >
        Logout
      </Button>

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
        <ActionButton form={form} />
      </Form>
    </AdminLayout>
  );
};

export default Biodata;
