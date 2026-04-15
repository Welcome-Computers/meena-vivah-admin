import { memo } from "react";
import { Col, Row } from "antd";
import PreviewButton from "../InputElements/PreviewButton";
import ConfromButton from "../InputElements/ConfromButtton";

const ActionButton = memo((props: any) => {
  const { form } = props;

  return (
        <div   style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
      marginTop:"20px"
    }}
    >

        <PreviewButton form={form} />

        <ConfromButton />

    </div>
  );
});

ActionButton.displayName = "ActionButton";
export default ActionButton;
