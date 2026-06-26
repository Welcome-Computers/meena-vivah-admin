import { Col, Divider, Modal, Row, Typography } from "antd";
import { memo } from "react";

const { Title, Text } = Typography;

interface iProps {
  title: string,
  isOpen: boolean,
  data: any,
  hanldeClose: any
}
const ModalPreviewProfile = memo((props: iProps) => {
  const { title, isOpen, data, hanldeClose } = props || {};

  return (
    <Modal
      open={isOpen}
      onCancel={hanldeClose}
      onOk={hanldeClose}
      title={title}
      width={720}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Text strong>Name:</Text>
          <br />
          <Text>{data.name || "Not provided"}</Text>
        </Col>

        <Col span={12}>
          <Text strong>Gender:</Text>
          <br />
          <Text>{data.gender?.value || "Not provided"}</Text>
        </Col>


        <Col span={12}>
          <Text strong>Relation:</Text>
          <br />
          <Text>{data.relation?.value || "Not provided"}</Text>
        </Col>

        <Col span={12}>
          <Text strong>Date of Birth:</Text>
          <br />
          <Text>
            {`${data.dob?.day || "--"}/${data.dob?.month || "--"
              }/${data.dob?.year || "--"}`}
          </Text>
        </Col>

        <Col span={12}>
          <Text strong>Occupation:</Text>
          <br />
          <Text>{data.occupation || "Not provided"}</Text>
        </Col>

        <Col span={12}>
          <Text strong>Occupation Details:</Text>
          <br />
          <Text>{data.occupation_details || "Not provided"}</Text>
        </Col>

        <Col span={12}>
          <Text strong>Education:</Text>
          <br />
          <Text>{data.education || "Not provided"}</Text>
        </Col>
      </Row>

      <Divider style={{ borderColor: "#f6d365" }} />

      <Title level={5} style={{
        color: "#d48806", marginBottom: "1rem",
      }}>Family Details</Title>

      <Row gutter={[16, 16]}>

        <Col span={12}>
          <Text strong>Father's Name:</Text>
          <br />
          <Text>{data.fathersname || "Not provided"}</Text>
        </Col>

        <Col span={12}>
          <Text strong>Father's Occupation:</Text>
          <br />
          <Text>{data.fathersoccupation || "Not provided"}</Text>
        </Col>

        <Col span={12}>
          <Text strong>Mother's Name:</Text>
          <br />
          <Text>{data.mothersname || "Not provided"}</Text>
        </Col>

        <Col span={12}>
          <Text strong>Mother's Occupation:</Text>
          <br />
          <Text>{data.mothersoccupation || "Not provided"}</Text>
        </Col>

        <Col span={12}>
          <Text strong>Sibling Name:</Text>
          <br />
          <Text>{data.sibling_name || "Not provided"}</Text>
        </Col>

        <Col span={12}>
          <Text strong>Sibling Education:</Text>
          <br />
          <Text>{data.sibling_education || "Not provided"}</Text>
        </Col>

        <Col span={12}>
          <Text strong>Sibling Occupation:</Text>
          <br />
          <Text>{data.sibling_occupation || "Not provided"}</Text>
        </Col>
      </Row>

    </Modal>
  );
});
export default ModalPreviewProfile;







