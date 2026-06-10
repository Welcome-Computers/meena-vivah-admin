import {
  Divider,
  Form,
  FormItemProps,
  Modal,
  Select,
  SelectProps
} from "antd";
import { memo, ReactNode, useState } from "react";

export type SelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

interface IProps extends Omit<SelectProps, "options" | "name"> {
  name: string | string[];
  label?: string | ReactNode;
  options: SelectOption[];

  mode?: "multiple" | "tags";
  rules?: any[];
  dependencies?: any[];
  formItemProps?: FormItemProps;

  allowCreate?: boolean;
  onCreateOption?: (value: string) => Promise<SelectOption | void>;
}

const SearchableSelectField = memo((props: IProps) => {
  const form = Form.useFormInstance();

  const {
    name,
    label,
    options,
    rules,
    dependencies,
    formItemProps,
    placeholder = "Select",
    mode,
    allowCreate,
    onCreateOption,
    ...rest
  } = props;

  const [searchText, setSearchText] = useState("");

  const exists = (text: string) =>
    options.some(
      (o) => o.label.toLowerCase().trim() === text.toLowerCase().trim()
    );

  const handleCreate = async (value: string) => {
    if (!allowCreate || !onCreateOption) return;

    const confirmed = await new Promise<boolean>((resolve) => {
      Modal.confirm({
        title: "Create new option?",
        content: `Do you want to add "${value}" ?`,
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });

    if (!confirmed) return;

    const created = await onCreateOption(value);

    if (created) {
      const current = form.getFieldValue(name);

      if (mode === "multiple" || mode === "tags") {
        form.setFieldValue(name, [...(current || []), created.value]);
      } else {
        form.setFieldValue(name, created.value);
      }
    }
  };

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      dependencies={dependencies}
      {...formItemProps}
    >
      <Select
        mode={mode}
        options={options}
        placeholder={placeholder}
        showSearch
        onSearch={setSearchText}
        optionFilterProp="label"
        filterOption={(input, option) =>
          String(option?.label ?? "")
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        size="small"
        className="custom-input"
        dropdownRender={(menu) => (
          <>
            {menu}

            {allowCreate && searchText.trim() && !exists(searchText) && (
              <>
                <Divider style={{ margin: 4 }} />
                <div
                  style={{
                    padding: 8,
                    cursor: "pointer",
                    color: "#1677ff",
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleCreate(searchText.trim());
                  }}
                >
                  + Add "{searchText}"
                </div>
              </>
            )}
          </>
        )}
        {...rest}
      />
    </Form.Item>
  );
});

SearchableSelectField.displayName = "SearchableSelectField";

export default SearchableSelectField;