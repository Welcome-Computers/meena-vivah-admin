import { DatePicker, DatePickerProps, Form, Select } from "antd";
import { RuleObject } from "antd/es/form";
import { useWatch } from "antd/es/form/Form";
import { memo } from "react";



// THER IS A BUG IN THIS COMPINET WHEN WE SELECT MONTH JAN THERE COULD ERRRO COME
interface DobProps extends DatePickerProps {
  name: string;
  label?: string;
}

const DobField = memo((props: DobProps) => {
  const { name, label, ...rest } = props;

  // validtion for day Length according to month and year
  const selectedMonth = useWatch([name, "month"]);
  const selectedYear = useWatch([name, "year"]);
  const dayLength = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  const dayOptions = Array.from({ length: dayLength }, (_, index) => ({
    label: index + 1,
    value: index + 1,
  }));

  const monthOptions = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 1 },
    { label: "Mar", value: 2 },
    { label: "Apr", value: 3 },
    { label: "May", value: 4 },
    { label: "Jun", value: 5 },
    { label: "Jul", value: 6 },
    { label: "Aug", value: 7 },
    { label: "Sep", value: 8 },
    { label: "Oct", value: 9 },
    { label: "Nov", value: 10 },
    { label: "Dec", value: 11 },
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 70 }, (_, index) => ({
    label: currentYear - index,
    value: currentYear - index,
  }));

  // dob age validation
  const ageValidation = (_: RuleObject, value: any) => {
    if (!value || !value.day || !value.month || !value.year) {
      return Promise.reject("All date fields are required");
    }
    const today = new Date();
    let age = today.getFullYear() - value.year;
    const monthDiff = today.getMonth() - value.month;

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < value.day)) {
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
      style={{ marginBottom: "5px" }}
      validateTrigger="onChange"
      label={label}
      rules={[
        { required: true, message: "DOB required" },
        { validator: ageValidation },
      ]}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* year field */}
        <Form.Item
          noStyle
          name={[name, "year"]}
          style={{ width: "100%", padding: "2px" }}
        >
          <Select placeholder="Year" options={yearOptions}></Select>
        </Form.Item>

        {/* month field */}
        <Form.Item
          noStyle
          name={[name, "month"]}
          style={{ width: "100%", padding: "2px" }}
        >
          <Select placeholder="Month" options={monthOptions}></Select>
        </Form.Item>

        {/* day field */}
        <Form.Item
          noStyle
          name={[name, "day"]}
          style={{ width: "100%", padding: "2px" }}
        >
          <Select placeholder="Day" options={dayOptions}></Select>
        </Form.Item>
      </div>
    </Form.Item>
  );
});
DobField.displayName = "DobField";
export default DobField;

