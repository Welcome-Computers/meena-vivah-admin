import { memo } from "react";
import { Col, Row } from "antd";
import PreviewButton from "../InputElements/PreviewButton";
import ConfromButton from "../InputElements/ConfromButtton";

const ActionButton = memo((props: any) => {
  const { form } = props;

  return (
      <Col xs={24} md={12}>
        <PreviewButton form={form} />
        <ConfromButton />
      </Col>
  );
});

ActionButton.displayName = "ActionButton";
export default ActionButton;
