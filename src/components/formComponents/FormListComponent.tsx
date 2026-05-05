import { Button, Form } from "antd";
import { Children, memo } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
const FormListComponent = memo((props: any) => {
  const { name, children, label, formListName ,isDisabled } = props;


  return (
    <Form.List name={formListName}>
      {(fields, { add, remove }) => (
        <div>
          {fields.map((value) => (
            <div key={value.key}>
              {typeof children === "function" ? children(value) : children}

              {fields.length > 1 && (
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    size="small"
                    onClick={() => remove(value.name)}
                    icon={<CloseOutlined />}
                  ></Button>
                </div>
              )}
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "end" }}>

            <Button
              icon={<PlusOutlined />}
              size="small"
               disabled={isDisabled}
              onClick={() => add()}
            ></Button>

          </div>
        </div>
      )}
    </Form.List>
  );
});

FormListComponent.displayName = "FormListComponent";
export default FormListComponent;
