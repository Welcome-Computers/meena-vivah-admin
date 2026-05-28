import { Button, Col, Divider, Form, Modal, Row } from "antd";
import { clearPreviewData } from "next/dist/server/api-utils";
import { memo, useState } from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

const PreviewButton = memo((props: any) => {
  const { form, name, label } = props;

type PreviewData={
   name?: string;
  gender?: { value?: string };
  relation?: { value?: string };
  dob?: any; 
  occupation?: string;
  education?: string;
  f_name?: string;
  f_occupation?: string;
  m_name?: string;
  m_occupation?: string;
  sibling_name?: string;
  sibling_education?: string;
  sibling_occupation?: string;
}

  const [isPreviewOpen, setisPreviewOpen] = useState<boolean>(false);
  const [dataPreview, setDataPreview] = useState<PreviewData>({});

  const handlePreviewButton = () => {
    const previewData = form.getFieldsValue();
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
         <Title
    level={4}
    style={{
      marginBottom: "1.5rem",
      color: "#d48806",
    }}
  >
    Review Everything
  </Title>

  <Row gutter={[16, 16]}>
    <Col span={12}>
      <Text strong>Name:</Text>
      <br />
      <Text>{dataPreview.name || "Not provided"}</Text>
    </Col>

    <Col span={12}>
      <Text strong>Gender:</Text>
      <br />
      <Text>{dataPreview.gender?.value || "Not provided"}</Text>
    </Col>


     <Col span={12}>
      <Text strong>Relation:</Text>
      <br />
      <Text>{dataPreview.relation?.value || "Not provided"}</Text>
    </Col>

    <Col span={12}>
      <Text strong>Date of Birth:</Text>
      <br />
      <Text>
        {`${dataPreview.dob?.day || "--"}/${
          dataPreview.dob?.month || "--"
        }/${dataPreview.dob?.year || "--"}`}
      </Text>
    </Col>

      <Col span={12}>
      <Text strong>Occupation:</Text>
      <br />
      <Text>{dataPreview.occupation || "Not provided"}</Text>
    </Col>

    <Col span={12}>
      <Text strong>Education:</Text>
      <br />
      <Text>{dataPreview.education || "Not provided"}</Text>
    </Col>
  </Row>

  <Divider style={{ borderColor: "#f6d365" }} />

   <Title
    level={5}
    style={{
      color: "#d48806",
      marginBottom: "1rem",
    }}
  >
    Family Details
  </Title>

  <Row gutter={[16, 16]}>
    <Col span={12}>
      <Text strong>Father's Name:</Text>
      <br />
      <Text>{dataPreview.f_name || "Not provided"}</Text>
    </Col>

      <Col span={12}>
      <Text strong>Father's Occupation:</Text>
      <br />
      <Text>{dataPreview.f_occupation || "Not provided"}</Text>
    </Col>

    <Col span={12}>
      <Text strong>Mother's Name:</Text>
      <br />
      <Text>{dataPreview.m_name || "Not provided"}</Text>
    </Col>

    <Col span={12}>
      <Text strong>Mother's Occupation:</Text>
      <br />
      <Text>{dataPreview.m_occupation || "Not provided"}</Text>
    </Col>

      <Col span={12}>
      <Text strong>Sibling Name:</Text>
      <br />
      <Text>{dataPreview.sibling_name || "Not provided"}</Text>
    </Col>

    <Col span={12}>
      <Text strong>Sibling Education:</Text>
      <br />
      <Text>{dataPreview.sibling_education || "Not provided"}</Text>
    </Col>

    <Col span={12}>
      <Text strong>Sibling Occupation:</Text>
      <br />
      <Text>{dataPreview.sibling_occupation || "Not provided"}</Text>
    </Col>
  </Row>
       
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









// import { Button, Form, Modal } from "antd";
// import { clearPreviewData } from "next/dist/server/api-utils";
// import { memo, useState } from "react";

// const PreviewButton = memo((props: any) => {
//   const { form, name, label } = props;

// type PreviewData={
//    name?: string;
//   gender?: { value?: string };
//   relation?: { value?: string };
//   dob?: any; 
//   occupation?: string;
//   education?: string;
//   f_name?: string;
//   f_occupation?: string;
//   m_name?: string;
//   m_occupation?: string;
//   sibling_name?: string;
//   sibling_education?: string;
//   sibling_occupation?: string;
// }

//   const [isPreviewOpen, setisPreviewOpen] = useState<boolean>(false);
//   const [dataPreview, setDataPreview] = useState<PreviewData>({});

//   const handlePreviewButton = () => {
//     const previewData = form.getFieldsValue();
//     setDataPreview(previewData);
//     setisPreviewOpen(true);
//   };

//   const hanldeClosePreview = () => {
//     setisPreviewOpen(false);
//   };

//   return (
//     <div>
//       <Modal
//         open={isPreviewOpen}
//         onCancel={hanldeClosePreview}
//         onOk={hanldeClosePreview}
//       >
//         <h1>Review Everything</h1>
//         <p>Name: {dataPreview.name || "Not provided"}</p>
//         <p>Gender: {dataPreview.gender?.value || "Not provided"}</p>
//         <p>Relation: {dataPreview.relation?.value || "Not provided"}</p>
//         <p>
//           Date of Birth:
//           {`${dataPreview.dob?.day}/${dataPreview.dob?.month}/${dataPreview.dob?.year}`}
//         </p>
//         <p>Occupation: {dataPreview.occupation || "Not provided"}</p>
//         <p>Education: {dataPreview.education || "Not provided"}</p>
//         <p>Father's Name: {dataPreview.f_name || "Not provided"}</p>
//         <p>Father's Occupation: {dataPreview.f_occupation || "Not provided"}</p>
//         <p>Mother's Name: {dataPreview.m_name || "Not provided"}</p>
//         <p>Mother's Occupation: {dataPreview.m_occupation || "Not provided"}</p>
//         <p>Sibling Name: {dataPreview.sibling_name || "Not provided"}</p>
//         <p>
//           Sibling Education: {dataPreview.sibling_education || "Not provided"}
//         </p>
//         <p>
//           Sibling Occupation:{" "}
//           {dataPreview.sibling_occupation || "Not provided"}{" "}
//         </p>
//       </Modal>

//       <Form.Item>
//         <Button type="primary" onClick={handlePreviewButton}>
//           Preview
//         </Button>
//       </Form.Item>
//     </div>
//   );
// });

// PreviewButton.displayName = "PreviewButton";
// export default PreviewButton;
