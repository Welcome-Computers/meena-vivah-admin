import { memo } from "react";
import InputField from "../InputElements/InputField";
import TextAreaField from "../InputElements/TextAreaField";
import style from "../../pages/biodata/style.module.css"

const FamilyDetails = memo((props: any) => {
  const { form } = props;

  return (
    <div className={style["form-container"]}>
  
      <InputField
        name="f_name"
        label="Father Name"
        rules={[{ required: true, message: "enter name first" }]}
      />
      <TextAreaField name="f_occupation" label="Occupation" rows={1}/>
      <InputField name="m_name" label="M.Name"  />
      <TextAreaField name="m_occupation" label="M.Occupation"  rows={1}/>
    </div>
  );
});

FamilyDetails.displayName = "FamilyDetails";
export default FamilyDetails;
