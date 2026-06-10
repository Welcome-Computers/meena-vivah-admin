import {
  Form,
  FormItemProps,
  Modal,
  Select,
  SelectProps,
} from "antd";
import { memo, ReactNode, useState } from "react";

export type SelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

interface IProps
  extends Omit<SelectProps, "options" | "name"> {

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

const SearchableSelectField = memo(
  (props: IProps) => {

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

    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState("");


    const handleCreateOption = async () => {
      if (!allowCreate || !searchText.trim() || !onCreateOption) {
        return;
      }

      const exists = options.some((item) => item.label.toLowerCase().trim() === searchText.toLowerCase().trim());

      if (exists) return;

      Modal.confirm({
        title: "Add new option?",
        content: `Do you want to add "${searchText}" ?`,

        async onOk() {
          const createdOption = await onCreateOption(searchText);
          if (createdOption) {
            form.setFieldValue(name, createdOption.value);
          }
        }
      });
    }


    return (
      <Form.Item
        name={name}
        label={label}
        rules={rules}
        dependencies={dependencies}
        style={{ marginBottom: "6px", }}
        {...formItemProps}
      >
        <Select
          mode={mode}
          options={options}
          placeholder={placeholder}
          onSearch={setSearchText}
          onInputKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              handleCreateOption();
            }

            if (e.key === "Enter") {
              e.preventDefault();
              handleCreateOption();
            }
          }}
          size="small"
          showSearch={{
            optionFilterProp: "label",
            filterOption: (
              input,
              option
            ) =>
              String(option?.label ?? "")
                .toLowerCase()
                .includes(
                  input.toLowerCase()
                ),
          }}
          className="custom-input"
          {...rest}
        />
      </Form.Item>
    );
  }
);

SearchableSelectField.displayName =
  "SearchableSelectField";

export default SearchableSelectField;