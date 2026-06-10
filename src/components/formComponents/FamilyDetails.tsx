import { Form } from "antd";
import { memo } from "react";
import style from "../../pages/profiles/style.module.css";
import InputField from "../InputElements/InputField";
import SearchableSelectField from "../InputElements/SearchableSelectField";

const FamilyDetails = memo((props: any) => {
  const { form, handleCreateOccupation, occupatonOptions, isOccupationLoading } = props;
  const motherName = Form.useWatch("mother_name", form);
  const fatherName = Form.useWatch("father_name", form);

  return (
    <div className={style["form-container"]}>
      <InputField
        name="father_name"
        label="Father Name"
        rules={[
          { required: true, message: "Enter first name " },
          { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
          { max: 30, message: "Maximum 30 characters" },
        ]}
      />

      <SearchableSelectField
        name="father_occupation"
        label="Father Occupation"
        disabled={!fatherName}
        allowCreate
        onCreateOption={handleCreateOccupation}
        options={occupatonOptions}
        loading={isOccupationLoading}
        placeholder="Select occupations"
        rules={[{ max: 100, message: "Maximum 100 characters" }]}
      />

      <InputField
        name="mother_name"
        label="Mother Name"
        rules={[
          { max: 100, message: "Maximum 100 characters" },
        ]}
      />
      <SearchableSelectField
        name="mother_occupation"
        label="Mother Occupation"
        disabled={!motherName}
        allowCreate
        onCreateOption={handleCreateOccupation}
        options={occupatonOptions}
        loading={isOccupationLoading}
        placeholder="Select occupations"
        rules={[{ max: 100, message: "Maximum 100 characters" }]}
      />
    </div>
  );
});

FamilyDetails.displayName = "FamilyDetails";
export default FamilyDetails;
