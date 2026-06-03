import { memo } from "react";
import InputField from "../InputElements/InputField";
import DobField from "../InputElements/DobField";
import TextAreaField from "../InputElements/TextAreaField";
import CheckBoxField from "../InputElements/CheckBoxField";
import style from "../../pages/biodata/style.module.css";
import { AutoComplete, Form, Select } from "antd";

const PersonalDetails = memo((props: any) => {
  const { form } = props;

  const occupationDropdown = [
  { label: "Doctor", value: "Doctor" },
  { label: "Engineer", value: "Engineer" },
  { label: "S.F.", value: "S.F." },
  { label: "Student", value: "Student" },
  { label: "Teacher / Professor", value: "Teacher / Professor" },
  { label: "Software Developer", value: "Software Developer" },
  { label: "Business Owner / Businessman", value: "Business Owner / Businessman" },
  { label: "Accountant / CA", value: "Accountant / CA" },
  { label: "Lawyer / Advocate", value: "Lawyer / Advocate" },
  { label: "Architect", value: "Architect" },
  { label: "Nurse", value: "Nurse" },
  { label: "Graphic Designer", value: "Graphic Designer" },
  { label: "Digital Marketer", value: "Digital Marketer" },
  { label: "Manager", value: "Manager" },
  { label: "Government Employee", value: "Government Employee" },
  { label: "Freelancer", value: "Freelancer" },
  { label: "Banker", value: "Banker" },
  { label: "Artist / Writer", value: "Artist / Writer" },
  { label: "Consultant", value: "Consultant" },
  { label: "Chef / Hospitality", value: "Chef / Hospitality" },
  { label: "Farmer / Agriculturist", value: "Farmer / Agriculturist" },
  { label: "Unemployed", value: "Unemployed" },
  { label: "Retired", value: "Retired" },
  { label: "Other", value: "Other" },
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
         mode="tags"
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
