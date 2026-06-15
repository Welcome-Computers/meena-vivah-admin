import { Form, Select } from "antd";
import dayjs from "dayjs";
import { memo, useMemo } from "react";

const { Option } = Select;

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  startYear?: number;
  endYear?: number;
}

const DayMonthYearPicker = memo((props: Props) => {
  const {
    name,
    label,
    required = true,
    startYear = 1950,
    endYear = dayjs().year(),
  } = props;

  const form = Form.useFormInstance();

  const day = Form.useWatch([name, "day"], form);
  const month = Form.useWatch([name, "month"], form);
  const year = Form.useWatch([name, "year"], form);

  // ✅ Dynamic days
  const daysInMonth = useMemo(() => {
    if (!month || !year) return 31;
    return dayjs(`${year}-${month}-01`).daysInMonth();
  }, [month, year]);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const months = Array.from({ length: 12 }, (_, i) => ({
    label: dayjs().month(i).format("MMMM"),
    value: i + 1,
  }));

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i
  );

  // ✅ Validation (like your DOB field)
  const validateDOB = async (_: any, value: any) => {
    const { day, month, year } = value || {};

    if (required && (!day || !month || !year)) {
      return Promise.reject("DOB required");
    }

    const date = dayjs(`${year}-${month}-${day}`, "YYYY-M-D", true);

    if (!date.isValid()) {
      return Promise.reject("Invalid date");
    }

    // Age validation (18+)
    const today = dayjs();
    let age = today.year() - date.year();

    if (
      today.month() < date.month() ||
      (today.month() === date.month() &&
        today.date() < date.date())
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
      label={label}
      validateTrigger="onChange"
      rules={[{ validator: validateDOB }]}
      style={{ marginBottom: 5 }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        {/* Day */}
        <Form.Item name={[name, "day"]} noStyle>
          <Select placeholder="Day" style={{ width: 80 }}>
            {days.map((d) => (
              <Option key={d} value={d}>
                {d}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Month */}
        <Form.Item name={[name, "month"]} noStyle>
          <Select placeholder="Month" style={{ width: 100 }}>
            {months.map((m) => (
              <Option key={m.value} value={m.value}>
                {m.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Year */}
        <Form.Item name={[name, "year"]} noStyle>
          <Select placeholder="Year" style={{ width: 100 }}>
            {years.map((y) => (
              <Option key={y} value={y}>
                {y}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </Form.Item>
  );
});

DayMonthYearPicker.displayName = "DayMonthYearPicker";
export default DayMonthYearPicker;

{/* <DayMonthYearPicker name="dob" label="Date of Birth" /> */ }
