import { memo } from "react";
import { Col, Row } from "antd";
import InputField from "../InputElements/InputField";
import TextAreaField from "../InputElements/TextAreaField";

const FamilyDetails = memo((props: any) => {
  const { form } = props;

  return (
    <Col xs={24} md={12}>
      <h2 style={{ fontFamily: "cursive", margin: "10px 0 5px 0" }}>
        Family Details
      </h2>

      <InputField
        name="f_name"
        label="F.Name"
        maxLength={50}
        showCount
        rules={[{ required: true, message: "enter name first" }]}
      />
      <TextAreaField name="f_occupation" label="F.Occupation"  rows={1}/>
      <InputField name="m_name" label="M.Name" maxLength={50} showCount />
      <TextAreaField name="m_occupation" label="M.Occupation"  rows={1}/>
    </Col>
  );
});

FamilyDetails.displayName = "FamilyDetails";
export default FamilyDetails;
