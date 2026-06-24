import { Form } from "antd";
import { memo } from "react";
import style from "../../pages/profiles/style.module.css";
import InputField from "../InputElements/InputField";

const FamilyDetails = memo((props: any) => {
  const { form } = props;
  const motherName = Form.useWatch("mothersname", form);
  const fatherName = Form.useWatch("fathersname", form);

  return (
    <div className={style["form-container"]}>

      <InputField
        name="fathersname"
        label="Father Name"
        rules={[
          // { required: true, message: "Enter Father Name " },
          { max: 30, message: "Maximum 30 characters" },
        ]}
      />

      <InputField
        name="fathersoccupation"
        label="Mother Occupation"
        disabled={!fatherName}
        rules={[
          { max: 100, message: "Maximum 30 characters" },
        ]}
      />

      <InputField
        name="mothersname"
        label="Mother Name"
        rules={[
          { max: 100, message: "Maximum 30 characters" },
        ]}
      />
      <InputField
        name="mothersoccupation"
        label="Mother Occupation"
        disabled={!motherName}
        rules={[
          { max: 100, message: "Maximum 30 characters" },
        ]}
      />

    </div>
  );
});

FamilyDetails.displayName = "FamilyDetails";
export default FamilyDetails;
