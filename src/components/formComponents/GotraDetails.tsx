import { memo } from "react";
import InputField from "../InputElements/InputField";
import { Button, Col, Form, Input } from "antd";
import style from "../../pages/biodata/style.module.css"
import FormListComponent from "./FormListComponent";


const GotraDetials = memo((props: any) => {
  const { label, name, showCount = false, rules, ...rest } = props;

  return (
    <Col xs={24} md={12}  className={style["form-container"]}>
      <h2 style={{ fontFamily: "cursive", margin: "10px 0 5px 0" }}  className={style["form-title"]}>
        Gotra Details
      </h2>

<div className={style["form-grid"]}>
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
        label="Grand_Mother"
        rules={[{ required: true, message: "Enter Grand_Mother Gotra Name" }]}
      />

      <InputField
        name="gotra_grandmother_maternal"
        label="Grand_Mother(Maternal)"
        rules={[
          { required: true, message: "Enter Grand_Mother_Maternal Gotra Name" },
        ]}
      />
</div>

<FormListComponent  formListName="other_gotra">
   {(value)=>(
    <div className={style["form-grid"]}>
    <InputField
                  name={[value.name, "other_gotra_relation"]}
                  label="Relation Name"
                  placeholder="e.g. Step Mother"
                />
                <InputField
                  name={[value.name, "other_gotra_name"]}
                  label="Other Gotra"
                  placeholder="e.g. Bhardwaj, Vashistha ..."
                />
                </div>
   )}
</FormListComponent>

    
    </Col>
  );
});

GotraDetials.displayName = "GotraDetials";
export default GotraDetials;





