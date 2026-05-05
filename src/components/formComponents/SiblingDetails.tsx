import { memo } from "react";
import { Col, Form } from "antd";
import InputField from "../InputElements/InputField";
import TextAreaField from "../InputElements/TextAreaField";
import CheckBoxField from "../InputElements/CheckBoxField";
import FormListComponent from "./FormListComponent";
import style from "../../pages/biodata/style.module.css";

const SiblingDetails = memo((props: any) => {
  const { form } = props;

  // validation for add empty entries
  const siblingdata = Form.useWatch("sibling_details", form) || [];
  const lastItem = siblingdata[siblingdata.length - 1];
  const valueDisabled =
    lastItem?.sibling_name?.length > 2 && lastItem?.relation?.length > 1;
  const isDisabled = !valueDisabled;
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
        {(value:any) => (
          <div>
            <InputField
              name={[value.name, "sibling_name"]}
              rules={[
                { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
                { max: 30, message: "Maximum 30 characters" },
              ]}
              label="Name"
            />

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
              rules={[{ max: 100, message: "Maximum 100 characters" }]}
            />
            <TextAreaField
              name={[value.name, "sibling_occupation"]}
              label="Occupation"
              rows={1}
              rules={[{ max: 100, message: "Maximum 100 characters" }]}
            />
          </div>
        )}
      </FormListComponent>
    </div>
  );
});

SiblingDetails.displayName = "SiblingDetails";
export default SiblingDetails;
