import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { memo } from "react";
const FormListComponent = memo((props: any) => {
  const { name, children, label, formListName, isDisabled } = props;


  return (
    <Form.List
      name={formListName}>
      {(fields, { add, remove }) => (
        <div
          style={{ marginBottom: 16 }}
        >
          {fields.map((value) => (
            <div
              key={value.key}
              style={{
                display: "flex",
                alignItems: "start",
                gap: 8,
                marginBottom: 8,
              }}
            >
              {/* Field */}
              <div style={{ flex: 1 }}>
                {typeof children === "function" ? children(value) : children}
              </div>

              {/* Remove Button (same row) */}
              {fields.length > 1 && (
                <Button
                  style={{ marginTop: "5px" }}
                  size="small"
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => remove(value.name)}
                />
              )}
            </div>
          ))}

          {/* Add Button (bottom right) */}
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              icon={<PlusOutlined />}
              size="small"
              disabled={isDisabled}
              onClick={() => add()}
            />
          </div>
        </div>
      )}
    </Form.List>
  );
});

FormListComponent.displayName = "FormListComponent";
export default FormListComponent;
