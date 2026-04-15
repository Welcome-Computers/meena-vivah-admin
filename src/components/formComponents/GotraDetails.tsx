import { memo } from "react";
import InputField from "../InputElements/InputField";
import { Button, Col, Form, Input, Row } from "antd";
import style from "../../pages/biodata/style.module.css";
import FormListComponent from "./FormListComponent";

const GotraDetials = memo((props: any) => {
  const { label, name, showCount = false, form, rules, ...rest } = props;

   // validation empty entries
   const otherGotra=Form.useWatch("other_gotra",form) || [];
   const lastItem=otherGotra[otherGotra.length - 1 ]
   const valueDisabled=lastItem?.other_gotra_relation?.length > 4 && lastItem?.other_gotra_name?.length > 4
  const isDisabled=!valueDisabled;

  return (
    <div className={style["form-container"]}>
      <p
        style={{ fontSize: "14px", margin: "10px 0 5px 0" }}
        className={style["form-title"]}
      >
        Gotra
      </p>


{/*  gotra details fields */}
      <div 
      >
        <InputField
          name="gotra_self"
          label="Self"
          rules={[{ required: true, message: "Enter Gotra Name" }]}
        />

        <InputField
          name="gotra_mother"
          label="Mother"
          rules={[{ required: true, message: "Enter Mother Gotra Name" }]}
        />

        <InputField
          name="gotra_grandmother"
          label="Grand Mother"
          rules={[{ required: true, message: "Enter Grand_Mother Gotra Name" }]}
        />

        <InputField
          name="gotra_grandmother_maternal"
          label="Grandmother"
          rules={[
            {
              required: true,
              message: "Enter Grand_Mother_Maternal Gotra Name",
            },
          ]}
        />
      </div>

{/* other gotra details and  button  */}
      <FormListComponent formListName="other_gotra" isDisabled={isDisabled}>
        {(value) => (
          <div style={{ display: "flex", width: "100%" }}>
            <InputField
              style={{ flex: 1 }}
              name={[value.name, "other_gotra_relation"]}
              label="Other Gotra"
              placeholder="e.g. Step Mother"
            />

            <InputField
              style={{ flex: 1 }}
              name={[value.name, "other_gotra_name"]}
              placeholder="e.g. Bhardwaj, Vashistha ..."
            />
          </div>
        )}
      </FormListComponent>


{/* pereferences */}
      <InputField name="preferences" label="Preferences" />




    </div>
  );
});

GotraDetials.displayName = "GotraDetials";
export default GotraDetials;
