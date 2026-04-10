import { memo } from "react";
import { Col, Row } from "antd";
import InputField from "../InputElements/InputField";
import TextAreaField from "../InputElements/TextAreaField";
import FormListComponent from "./FormListComponent";
import style from "../../pages/biodata/style.module.css";

const AddressDetails = memo((props: any) => {
  const { form } = props;

  return (
    <Col xs={24} md={12} className={style["form-container"]}>
      <h2
        style={{ fontFamily: "cursive", margin: "0px 0 5px 0" }}
        className={style["form-title"]}
      >
        Address Details
      </h2>

      <FormListComponent formListName="address_details">
        {(value) => (
          <div className={style["form-grid"]}>
             <div style={{ gridColumn: "span 2" }}>
            <TextAreaField
              name={[value.name, "address"]}
              label="Address"
              rows={1}
            /></div>
                <InputField 
                name={[value.name, "state"]} label="State" />
                <InputField
                  name={[value.name, "tehsil"]}
                  label="Tehsil/Villa"
                />

                <InputField name={[value.name, "city"]} label="City" placeholder="e.g.jaipur"/>
                <InputField name={[value.name, "pincode"]} label="Pincode"  placeholder="e.g. 332001"/>

          </div>
        )}
      </FormListComponent>
    </Col>
  );
});

AddressDetails.displayName = "AddressDetails";
export default AddressDetails;
