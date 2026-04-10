import { memo } from "react";
import { Col } from "antd";
import InputField from "../InputElements/InputField";
import TextAreaField from "../InputElements/TextAreaField";
import CheckBoxField from "../InputElements/CheckBoxField";
import FormListComponent from "./FormListComponent";
import style from "../../pages/biodata/style.module.css"

const SiblingDetails = memo((props: any) => {
  const { form } = props;

  return (
    <Col xs={24} md={12} className={style["form-container"]}>
      <h2 style={{ fontFamily: "cursive", margin: "10px 0 5px 0" }} className={style["form-title"]}>
        Siblings Details
      </h2>

      <FormListComponent formListName="sibling_details">
        {(value) => (
          <div className={style["form-grid"]}>
             <div style={{ gridColumn: "span 2" }}>

            <InputField
                  name={[value.name, "sibling_name"]}
                  label="Sibling.Name"
                /></div>

                <TextAreaField
                  name={[value.name, "sibling_education"]}
                  label="Sibling.Education"
                  rows={1}
                />
                <TextAreaField
                  name={[value.name, "sibling_occupation"]}
                  label="Sibling.Occupation"
                  rows={1}
                />
                             <div style={{ gridColumn: "span 2" }}>
                
                <CheckBoxField
                  label="Relation"
                  form={form}
                  name={[value.name, "relation"]}
                  options={[
                    {
                      option: "Sister",
                      value: "Sister",
                    },
                    {
                      option: "Brother",
                      value: "Brother",
                    },
                  ]}
                />
                </div>
                </div>
        )}
      
              
</FormListComponent>
    </Col>
  );
});

SiblingDetails.displayName = "SiblingDetails";
export default SiblingDetails;




