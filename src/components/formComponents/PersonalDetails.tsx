import { memo } from "react";
import InputField from "../InputElements/InputField";
import DobField from "../InputElements/DobField";
import TextAreaField from "../InputElements/TextAreaField";
import CheckBoxField from "../InputElements/CheckBoxField";
import style from "../../pages/biodata/style.module.css";
import { Form, Select } from "antd";

const PersonalDetails = memo((props: any) => {
  const { form } = props;

  const occupationDropdown = [
    { label: "Doctor", value: 1 },
    { label: "Engineer", value: 2 },
    { label: "S.F.", value: 5 },
    { label: "Student", value: 6 },
    { label: "Teacher / Professor", value: 7 },
    { label: "Software Developer", value: 8 },
    { label: "Business Owner / Businessman", value: 9 },
    { label: "Accountant / CA", value: 10 },
    { label: "Lawyer / Advocate", value: 11 },
    { label: "Architect", value: 12 },
    { label: "Nurse", value: 13 },
    { label: "Graphic Designer", value: 14 },
    { label: "Digital Marketer", value: 15 },
    { label: "Manager", value: 16 },
    { label: "Government Employee", value: 17 },
    { label: "Freelancer", value: 18 },
    { label: "Banker", value: 19 },
    { label: "Artist / Writer", value: 20 },
    { label: "Consultant", value: 21 },
    { label: "Chef / Hospitality", value: 22 },
    { label: "Farmer / Agriculturist", value: 23 },
    { label: "Unemployed", value: 24 },
    { label: "Retired", value: 25 },
    { label: "Other", value: 26 },
  ];

  return (
    <div className={style["form-container"]}>
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
        label="Occupation Details"
        form={form}
        rows={4}
        rules={[{ max: 100, message: "Maximum 100 characters" }]}
        maxLength={50}
      />

      {/* occupation (dropdown to select) */}
      <Form.Item
        name="occupatonDropdown"
        label="Select Occupation"
        style={{ marginBottom: "6px" }}
      >
        <Select
          placeholder="e.g. Enginneer"
          options={occupationDropdown}
          showSearch
          optionFilterProp="label"
          style={{
            outline: "none",
            borderRadius: "0",
            border: "2px solid #444444",
          }}
        ></Select>
      </Form.Item>
    </div>
  );
});

PersonalDetails.displayName = "PersonalDetails";
export default PersonalDetails;
