import { Button, Col, Form, Row } from "antd";
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



  const handleFromSubmit = async() => {
    const value = form.getFieldsValue();
  try {
    const res=await fetch("/api/userController",
      {method:"POST" ,headers:{"Content-Type":"application/json"},body:JSON.stringify(value),})
      console.log(res.json)
  } catch (error) {
    console.log("err data", error);
  }  
  console.log("form data",value);  

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
          <Col  xs={24} md={12}>
          <PersonalDetails form={form} />
          <FamilyDetails form={form} />
          <SiblingDetails form={form} />
</Col>

<Col  xs={24} md={12}>
          <GotraDetials form={form} 
          />
          <PreferencesMobileDetails form={form} />
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
