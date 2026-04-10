import { Button, Form, Row } from "antd";
import AdminLayout from "../../components/layout/AdminLayout";
import SiblingDetails from "@/components/formComponents/SiblingDetails";
import PersonalDetails from "@/components/formComponents/PersonalDetails";
import ActionButton from "@/components/formComponents/ActionButtons";
import FamilyDetails from "@/components/formComponents/FamilyDetails";
import GotraDetials from "@/components/formComponents/GotraDetails";
import PreferencesMobileDetails from "@/components/formComponents/PreferencesMobileDetails";
import AddressDetails from "@/components/formComponents/AddressDetails";
import OtherDetails from "@/components/formComponents/OtherDetails";

const Biodata = () => {
  const [form] = Form.useForm();

  const handleFromSubmit = () => {
    const value = form.getFieldsValue();
    console.log("data", value);
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
