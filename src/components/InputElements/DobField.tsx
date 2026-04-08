import { DatePicker, DatePickerProps, Form } from "antd";
import { memo } from "react";

interface DobProps extends DatePickerProps{
  name:string;
  label?:string;
}


const DobField = memo((props: DobProps) => {
  const { name, label ,...rest} = props;

  const ageValidation = (_: any, value: any) => {
    const today = new Date();
    const userDob=value.toDate();

    let age = today.getFullYear() - userDob.getFullYear();
    const monthDiff = today.getMonth() - userDob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < userDob.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      return Promise.reject("Age must be 18 or above");
    }
    return Promise.resolve();
  };
  return (
        <Form.Item
          name={name}
          style={{ marginBottom: "6px" }}
          validateTrigger="onChange"
          label={label}
          rules={[
            { required: true, message: "DOB required" },
            { validator: ageValidation },
          ]}
        >
          <DatePicker size="small" {...rest}/>
        </Form.Item>
  );
});
DobField.displayName = "DobField";
export default DobField;
