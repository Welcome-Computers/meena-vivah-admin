import { DatePickerProps, Form, Select } from "antd";
import { RuleObject } from "antd/es/form";
import { useWatch } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useRef } from "react";



// THER IS A BUG IN THIS COMPINET WHEN WE SELECT MONTH JAN THERE COULD ERRRO COME
interface DobProps extends DatePickerProps {
  name: string;
  label?: string;
}

const DobField = (props: DobProps) => {
  const { name, label, ...rest } = props;

  const yearRef = useRef<any>(null);
  const monthRef = useRef<any>(null);
  const dayRef = useRef<any>(null);

  // validtion for day Length according to month and year
  const selectedMonth = useWatch([name, "month"]);
  const selectedYear = useWatch([name, "year"]);
  const dayLength = new Date(selectedYear, selectedMonth, 0).getDate();

  const dayOptions = Array.from({ length: dayLength }, (_, index) => ({
    label: index + 1,
    value: index + 1,
  }));

  const monthOptions = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];


  const currentYear = dayjs().year();

  const maxAllowedYear = currentYear - 18;

  const yearOptions = Array.from(
    { length: 70 },
    (_, index) => ({
      label: maxAllowedYear - index,
      value: maxAllowedYear - index,
    })
  );

  const form = Form.useFormInstance();


  const ageValidation = (_: RuleObject, value: any) => {
    if (
      value?.day === undefined ||
      value?.month === undefined ||
      value?.year === undefined
    ) {
      return Promise.resolve(); // no validation yet
    }

    const today = new Date();

    let age = today.getFullYear() - value.year;

    const monthDiff =
      today.getMonth() - value.month;

    if (
      monthDiff < 0 ||
      (monthDiff === 0 &&
        today.getDate() < value.day)
    ) {
      age--;
    }

    if (age < 18) {
      return Promise.reject(
        new Error("Age must be 18 or above")
      );
    }
    return Promise.resolve();
  };

  const filterSelectOption = (
    input: string,
    option?: { label?: React.ReactNode; value?: unknown }
  ) => {
    const label = String(option?.label ?? "").toLowerCase();
    const value = String(option?.value ?? "");

    return (
      label.includes(input.toLowerCase()) ||
      value.startsWith(input)
    );
  };

  return (
    <Form.Item
      name={name}
      label={label}
      style={{ marginBottom: "5px" }}
      validateTrigger={["onChange", "onBlur"]}
      dependencies={[name]}
      rules={[
        { required: true, message: "Enter DOB" },
        { validator: ageValidation },
      ]}
    >
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8,
      }}>
        {/* year field */}
        <Form.Item
          name={[name, "year"]}
          noStyle
          rules={[
            { required: true, message: "Year is required" }
          ]}
        >
          <Select
            ref={yearRef}
            showSearch
            className="custom-input"
            placeholder="Year" options={yearOptions}
            onChange={() => {
              requestAnimationFrame(() => {
                monthRef.current?.focus();
              });
            }}
          />
        </Form.Item>

        {/* month field */}
        <Form.Item
          noStyle
          name={[name, "month"]}
          rules={[
            { required: true, message: "Month is required" }
          ]}
        >
          <Select
            showSearch={{
              filterOption: filterSelectOption,
              autoClearSearchValue: true,
            }}
            ref={monthRef}
            className="custom-input"
            placeholder="Month"
            options={monthOptions}
            onChange={() => {
              requestAnimationFrame(() => {
                dayRef.current?.focus();
              });
            }}
          />
        </Form.Item>

        {/* day field */}
        <Form.Item
          noStyle
          name={[name, "day"]}
          rules={[
            { required: true, message: "Day is required" }
          ]}
        >
          <Select
            ref={dayRef}
            showSearch
            className="custom-input"
            placeholder="Day" options={dayOptions}
          // onChange={() => {
          //   requestAnimationFrame(() => {
          //     fatherNameRef.current?.focus();
          //   });
          // }}
          ></Select>
        </Form.Item>
      </div>
    </Form.Item>
  );
};

DobField.displayName = "DobField";
export default DobField;

