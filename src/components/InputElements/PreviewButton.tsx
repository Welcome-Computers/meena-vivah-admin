import { Button, Form, Modal } from "antd";
import { clearPreviewData } from "next/dist/server/api-utils";
import { memo, useState } from "react";

const PreviewButton = memo((props: any) => {
  const { form, name, label } = props;
  const [isPreviewOpen, setisPreviewOpen] = useState<boolean>(false);
  const [dataPreview, setDataPreview] = useState({});

  const handlePreviewButton = () => {
    const previewData = form.getFieldsValue();
    // console.log("preview data",previewData)
    setDataPreview(previewData);
    setisPreviewOpen(true);
  };

  const hanldeClosePreview = () => {
    setisPreviewOpen(false);
  };

  return (
    <div>
      <Modal
        open={isPreviewOpen}
        onCancel={hanldeClosePreview}
        onOk={hanldeClosePreview}
      >
        <h1>Review Everything</h1>
        <p>Name: {dataPreview.name || "Not provided"}</p>
        <p>Gender: {dataPreview.gender?.value || "Not provided"}</p>
        <p>Relation: {dataPreview.relation?.value || "Not provided"}</p>
        <p>
          Date of Birth:{" "}
          {dataPreview.dob ? dataPreview.dob.format("DD-MM-YYYY") : "Not provided"}
        </p>
        <p>Occupation: {dataPreview.occupation || "Not provided"}</p>
        <p>Education: {dataPreview.education || "Not provided"}</p>
        <p>Father's Name: {dataPreview.f_name || "Not provided"}</p>
        <p>Father's Occupation: {dataPreview.f_occupation || "Not provided"}</p>
        <p>Mother's Name: {dataPreview.m_name || "Not provided"}</p>
        <p>Mother's Occupation: {dataPreview.m_occupation || "Not provided"}</p>
        <p>Sibling Name: {dataPreview.sibling_name || "Not provided"}</p>
        <p>
          Sibling Education: {dataPreview.sibling_education || "Not provided"}
        </p>
        <p>
          Sibling Occupation:{" "}
          {dataPreview.sibling_occupation || "Not provided"}{" "}
        </p>
      </Modal>

      <Form.Item>
        <Button type="primary" onClick={handlePreviewButton}>
          Preview
        </Button>
      </Form.Item>
    </div>
  );
});

PreviewButton.displayName = "PreviewButton";
export default PreviewButton;
