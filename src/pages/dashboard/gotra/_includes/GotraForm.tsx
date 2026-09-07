import InputField from "@/components/InputElements/InputField";
import { Button, Form } from "antd";



export default function GotraForm(props: any) {
  const { form, handleOnSubmit } = props

  return (
    <>
      <Form
        layout="horizontal"
        labelAlign="left"
        form={form}
        onFinish={handleOnSubmit}

      >
        <InputField
          name="master-gotra"
          label="Gotra Name"
          rules={[{ max: 50, message: "Maximum 50 characters" }]}
        />

        <Button htmlType="submit">Save</Button>
      </Form>

    </>
  )
}


