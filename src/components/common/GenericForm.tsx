import InputField from "@/components/InputElements/InputField";
import { Button, Form } from "antd";

export default function GenericForm(props: any) {
  const { form, handleOnSubmit ,label,name } = props;

  return (
    <>
      <Form
        layout="horizontal"
        labelAlign="left"
        form={form}
        onFinish={handleOnSubmit}
      >
        <InputField
          name={name}
          label={label}
          rules={[{ max: 50, message: "Maximum 50 characters" }]}
        />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button htmlType="submit">Save</Button>
        </div>
      </Form>
    </>
  );
}
