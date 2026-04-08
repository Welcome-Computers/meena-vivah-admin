import { Button, Form } from "antd";
import { memo } from "react";

const ConfromButton = memo(() => {
  return (
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Confrom
      </Button>
    </Form.Item>
  );
});

ConfromButton.displayName = "ConfromButton";
export default ConfromButton;
