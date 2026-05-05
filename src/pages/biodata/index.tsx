import ActionButton from "@/components/formComponents/ActionButtons";
import AddressDetails from "@/components/formComponents/AddressDetails";
import FamilyDetails from "@/components/formComponents/FamilyDetails";
import GotraDetials from "@/components/formComponents/GotraDetails";
import OtherDetails from "@/components/formComponents/OtherDetails";
import PersonalDetails from "@/components/formComponents/PersonalDetails";
import PreferencesMobileDetails from "@/components/formComponents/PreferencesMobileDetails";
import SiblingDetails from "@/components/formComponents/SiblingDetails";
import { Button, Form, Row } from "antd";
import AdminLayout from "../../components/layout/AdminLayout";

const Biodata = () => {
  const [form] = Form.useForm();



  const handleFromSubmit = async () => {
    const value = form.getFieldsValue();
    try {
      const res = await fetch("/api/userController",
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(value), })

      console.log(res.json)

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
        form={form}
        onFinish={handleFromSubmit}
        initialValues={{
          sibling_details: [{}],
          mobile_details: [{}],
          other_gotra: [{}],
          address_details: [{}],
        }}
      >
        <Row gutter={[30, 30]}>
          <PersonalDetails form={form} />
          <FamilyDetails form={form} />
        </Row>

        <Row gutter={[30, 30]}>
          <AddressDetails form={form} />
          <SiblingDetails form={form} />
        </Row>

        <Row gutter={[30, 30]}>
          <GotraDetials form={form} />
          <PreferencesMobileDetails form={form} />
        </Row>

        <Row gutter={[30, 30]}>
          <OtherDetails />
          <ActionButton form={form} />
        </Row>
      </Form>
    </AdminLayout>
  );
};

export default Biodata;
