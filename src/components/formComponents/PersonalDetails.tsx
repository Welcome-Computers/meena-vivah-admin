import { memo } from "react";
import InputField from "../InputElements/InputField";
import DobField from "../InputElements/DobField";
import TextAreaField from "../InputElements/TextAreaField";
import { Col, message } from "antd";
import CheckBoxField from "../InputElements/CheckBoxField";

const PersonalDetails = memo((props: any) => {
  const { form } = props;

  return (
    <Col xs={24} md={12}>
      <h2 style={{ fontFamily: "cursive", margin: "10px 0 5px 0" }}>
        Personal Details
      </h2>
      <CheckBoxField
        form={form}
        name="gender"
        label="Gender"
        rules={[
         { required:true,message:"Select Gender First"}
        ]}
        options={[
          { option: "Groom", value: "Groom" },
          { option: "Bride", value: "Bride" },
        ]}
      />

      <InputField
        name="name"
        label="Name"
        maxLength={50}
        showCount
        rules={[{ required: true, message: "enter name first" }]}
      />
      <DobField name="dob" label="Date of Birth" />
      <TextAreaField name="education" label="Education" form={form} rows={1} maxLength={50} rules={
        [
          {required:true,message:"Education Qualification Must be Filled."}
        ]
      }/>
      <TextAreaField name="occupation" label="Occupation" form={form} rows={1} maxLength={50}/>
    </Col>
  );
});

PersonalDetails.displayName = "PersonalDetails";
export default PersonalDetails;
