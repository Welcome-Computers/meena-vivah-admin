import { Form, Select } from "antd";
import { FormInstance, useWatch } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useRef, useState } from "react";

interface DobProps {
  name: string;
  label?: string;
  form: FormInstance;
}

const DobField = ({ name, label, form }: DobProps) => {
  const yearRef = useRef<any>(null);
  const monthRef = useRef<any>(null);
  const dayRef = useRef<any>(null);

  const [yearSearch, setYearSearch] = useState("");
  const [monthSearch, setMonthSearch] = useState("");
  const [daySearch, setDaySearch] = useState("");

  // Watch DOB fields
  const selectedMonth = useWatch([name, "month"], form);
  const selectedYear = useWatch([name, "year"], form);

  // ------------------------------------
  // Day length according to year + month
  // ------------------------------------
  const dayLength =
    selectedYear && selectedMonth
      ? new Date(selectedYear, selectedMonth, 0).getDate()
      : 31;

  const dayOptions = Array.from(
    { length: dayLength },
    (_, index) => ({
      label: index + 1,
      value: index + 1,
    })
  );

  // ------------------------------------
  // Month options
  // ------------------------------------
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

  // ------------------------------------
  // Year options
  // ------------------------------------
  const currentYear = dayjs().year();
  const maxAllowedYear = currentYear - 18;

  const yearOptions = Array.from(
    { length: 70 },
    (_, index) => ({
      label: maxAllowedYear - index,
      value: maxAllowedYear - index,
    })
  );

  // ------------------------------------
  // Search filter
  // ------------------------------------
  const filterSelectOption = (
    input: string,
    option?: {
      label?: React.ReactNode;
      value?: unknown;
    }
  ) => {
    const search = input.toLowerCase();

    const labelValue = String(
      option?.label ?? ""
    ).toLowerCase();

    const optionValue = String(
      option?.value ?? ""
    );

    return (
      labelValue.includes(search) ||
      optionValue.startsWith(input)
    );
  };

  // ------------------------------------
  // Convert month text -> month number
  // ------------------------------------
  const getMonthValue = (input: string) => {
    const search = input.trim().toLowerCase();

    const month = monthOptions.find((item) =>
      item.label
        .toLowerCase()
        .startsWith(search)
    );

    return month?.value;
  };

  // ------------------------------------
  // Commit manually typed year
  // ------------------------------------
  const commitYear = () => {
    const value = yearSearch.trim();

    if (!value) return;

    const year = Number(value);

    if (
      /^\d{4}$/.test(value) &&
      year >= 1900 &&
      year <= maxAllowedYear
    ) {
      // Only update DOB.year
      form.setFieldValue(
        [name, "year"],
        year
      );

      setYearSearch("");

      requestAnimationFrame(() => {
        monthRef.current?.focus();
      });

      return;
    }

    setYearSearch("");
  };

  // ------------------------------------
  // Commit manually typed month
  // ------------------------------------
  const commitMonth = () => {
    const value = monthSearch.trim();

    if (!value) return;

    const month = getMonthValue(value);

    if (month) {
      // Only update DOB.month
      form.setFieldValue(
        [name, "month"],
        month
      );

      setMonthSearch("");

      requestAnimationFrame(() => {
        dayRef.current?.focus();
      });

      return;
    }

    setMonthSearch("");
  };

  // ------------------------------------
  // Commit manually typed day
  // ------------------------------------
  const commitDay = () => {
    const value = daySearch.trim();

    if (!value) return;

    const day = Number(value);

    if (
      Number.isInteger(day) &&
      day >= 1 &&
      day <= dayLength
    ) {
      // Only update DOB.day
      form.setFieldValue(
        [name, "day"],
        day
      );

      setDaySearch("");
      return;
    }

    setDaySearch("");
  };

  // ------------------------------------
  // Age validation
  // ------------------------------------


  return (
    <Form.Item
      label={label}
      style={{ marginBottom: 0 }}
    >
      <div
        style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8,
        }}
      >
        {/* =========================
            YEAR
        ========================= */}
        <Form.Item
          name={[name, "year"]}
        // rules={[
        //   {
        //     required: true,
        //     message: "Year is required",
        //   },
        // ]}
        >
          <Select
            ref={yearRef}
            className="custom-input"
            placeholder="Year"
            options={yearOptions}
            allowClear
            showSearch={{
              filterOption:
                filterSelectOption,
              autoClearSearchValue: true,

              onSearch: (value) => {
                setYearSearch(value);
              },
            }}
            onSelect={() => {
              setYearSearch("");

              requestAnimationFrame(() => {
                monthRef.current?.focus();
              });
            }}
            onInputKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                commitYear();
              }
            }}
            onBlur={() => { commitYear() }}
          />
        </Form.Item>

        {/* =========================
            MONTH
        ========================= */}
        <Form.Item
          name={[name, "month"]}
        // rules={[
        //   {
        //     required: true,
        //     message: "Month is required",
        //   },
        // ]}
        >
          <Select
            ref={monthRef}
            className="custom-input"
            placeholder="Month"
            options={monthOptions}
            allowClear
            showSearch={{
              filterOption:
                filterSelectOption,
              autoClearSearchValue: true,

              onSearch: (value) => {
                setMonthSearch(value);
              },
            }}
            onSelect={() => {
              setMonthSearch("");

              requestAnimationFrame(() => {
                dayRef.current?.focus();
              });
            }}
            onInputKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                commitMonth();
              }
            }}
            onBlur={() => { commitMonth() }}
          />
        </Form.Item>

        {/* =========================
            DAY
        ========================= */}
        <Form.Item
          name={[name, "day"]}
        // rules={[
        //   {
        //     required: true,
        //     message: "Day is required",
        //   },
        // ]}
        >
          <Select
            ref={dayRef}
            className="custom-input"
            placeholder="Day"
            options={dayOptions}
            allowClear
            showSearch={{
              filterOption:
                filterSelectOption,
              autoClearSearchValue: true,

              onSearch: (value) => {
                setDaySearch(value);
              },
            }}
            onSelect={() => {
              setDaySearch("");
            }}
            onInputKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                commitDay();
              }
            }}
            onBlur={() => { commitDay() }}
          />
        </Form.Item>
      </div>
    </Form.Item>
  );
};

DobField.displayName = "DobField";

export default DobField;