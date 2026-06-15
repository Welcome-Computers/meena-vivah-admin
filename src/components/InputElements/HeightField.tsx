import { Form, Select } from "antd";
import { memo } from "react";

interface HeightFieldProps {
  name: string;
  label?: string;
}

const HeightField = memo(
  ({ name, label }: HeightFieldProps) => {

    const footOptions = Array.from(
      { length: 4 },
      (_, index) => ({
        label: `${index + 4} ft`,
        value: index + 4,
      })
    );

    const inchOptions = Array.from(
      { length: 12 },
      (_, index) => ({
        label: `${index} in`,
        value: index,
      })
    );

    return (
      <Form.Item
        name={name}
        label={label}
        style={{ marginBottom: 5 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
        >
          {/* FOOT */}
          <Form.Item
            noStyle
            name={[name, "foot"]}
          >
            <Select
              placeholder="Foot"
              options={footOptions}
              className="custom-input"
            />
          </Form.Item>

          {/* INCH */}
          <Form.Item
            noStyle
            name={[name, "inch"]}
          >
            <Select
              placeholder="Inch"
              options={inchOptions}
              className="custom-input"
            />
          </Form.Item>
        </div>
      </Form.Item>
    );
  }
);

HeightField.displayName =
  "HeightField";

export default HeightField;