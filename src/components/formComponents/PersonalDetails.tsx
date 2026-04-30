import { memo } from "react";
import InputField from "../InputElements/InputField";
import DobField from "../InputElements/DobField";
import TextAreaField from "../InputElements/TextAreaField";
import { Col, message } from "antd";
import CheckBoxField from "../InputElements/CheckBoxField";
import style from "../../pages/biodata/style.module.css";

const PersonalDetails = memo((props: any) => {
  const { form } = props;

  return (
    <div className={style["form-container"]}>
      <CheckBoxField
        form={form}
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Select Gender First" }]}
        options={[
          { option: "Groom", value: "Groom" },
          { option: "Bride", value: "Bride" },
        ]}
      />
      <InputField
        name="name"
        label="Name"
        rules={[
          { required: true, message: "enter name first" },
          { max: 30, message: "Maximum 30 characters" },
          { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
        ]}
      />
      <DobField name="dob" label="Date of Birth" />
      <TextAreaField
        name="education"
        label="Education"
        form={form}
        rows={4}
        maxLength={50}
        rules={[
          {
            required: true,
            message: "Education Qualification Must be Filled.",
          },

          { max: 100, message: "Maximum 100 characters" },
        ]}
      />
      <TextAreaField
        name="occupation"
        label="Occupation"
        form={form}
        rows={4}
        rules={[{ max: 100, message: "Maximum 100 characters" }]}
        maxLength={50}
      />
    </div>
  );
});

PersonalDetails.displayName = "PersonalDetails";
export default PersonalDetails;
