import { memo } from "react";
import { Col, Form } from "antd";
import InputField from "../InputElements/InputField";
import TextAreaField from "../InputElements/TextAreaField";
import CheckBoxField from "../InputElements/CheckBoxField";
import FormListComponent from "./FormListComponent";
import style from "../../pages/biodata/style.module.css";

const SiblingDetails = memo((props: any) => {
  const { form } = props;

  // validation empty entries
   const siblingdata=Form.useWatch("sibling_details",form) || [];
   const lastItem=siblingdata[siblingdata.length - 1 ]
   const valueDisabled=lastItem?.sibling_name?.length > 5 && lastItem?.relation?.length > 1
  const isDisabled=!valueDisabled;



  return (
    <div
      className={style["form-container"]}
      style={{ backgroundColor: "#eeeeee" }}
    >
      <p
        style={{ margin: "10px 0 5px 0", fontSize: "14px" }}
        className={style["form-title"]}
      >
        Siblings Details
      </p>

      <FormListComponent formListName="sibling_details" isDisabled={isDisabled}>
        {(value) => (
          <div>
            <InputField name={[value.name, "sibling_name"]} label="Name" />

            <CheckBoxField
              label="Relation"
              form={form}
              isLableShow={true}
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

            <TextAreaField
              name={[value.name, "sibling_education"]}
              label="Education"
              rows={1}
            />
            <TextAreaField
              name={[value.name, "sibling_occupation"]}
              label="Occupation"
              rows={1}
            />
          </div>
        )}

      </FormListComponent>
    </div>
  );
});

SiblingDetails.displayName = "SiblingDetails";
export default SiblingDetails;
